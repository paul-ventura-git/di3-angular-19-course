import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      minPrice: [''],
      maxPrice: [''],
      rating: [''],
      inStock: [false],
      onSale: [false],
      sort: ['relevance']
    });

    this.productService.getProducts()
      .subscribe(products => {

        this.products = products;
        this.filteredProducts = products;

      });

    this.filterForm.valueChanges
      .subscribe(() => this.applyFilters());
  }

  applyFilters() {

    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      inStock,
      onSale,
      sort
    } = this.filterForm.value;

    let result = [...this.products];

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= minPrice);
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= maxPrice);
    }

    if (rating) {
      result = result.filter(p => p.rating >= rating);
    }

    if (inStock) {
      result = result.filter(p => p.inStock);
    }

    if (onSale) {
      result = result.filter(p => p.onSale);
    }

    if (sort === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    this.filteredProducts = result;

  }

}
