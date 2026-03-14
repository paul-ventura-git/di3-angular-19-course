import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  stock: number;
  thumbnail: string;
}

@Component({
  standalone: true,
  selector: 'app-gallery',
  imports: [ CommonModule, ReactiveFormsModule ],
  styleUrl: './gallery.component.css',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  filterForm!: FormGroup;

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  visibleProducts: Product[] = [];

  page = 1;
  pageSize = 20; // 5 filas * 4 columnas

  loading = false;

  categories: string[] = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      minPrice: [''],
      maxPrice: [''],
      rating: [''],
      inStock: [false],
      sort: ['relevance']
    });

    this.loadProducts();

    /* restaurar filtros desde URL */
    this.route.queryParams.subscribe(params => {

      this.filterForm.patchValue({
        search: params['search'] || '',
        category: params['category'] || '',
        minPrice: params['minPrice'] || '',
        maxPrice: params['maxPrice'] || '',
        rating: params['rating'] || '',
        inStock: params['inStock'] === 'true',
        sort: params['sort'] || 'relevance'
      }, { emitEvent:false });

      this.applyFilters();

    });

    /* debounce para búsqueda */
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(values => {

        this.router.navigate([], {
          queryParams: values,
          queryParamsHandling: 'merge'
        });

        this.applyFilters();

      });

  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  loadProducts() {

    this.loading = true;

    this.http
      .get<any>('https://dummyjson.com/products?limit=5000')
      .subscribe(res => {

        this.allProducts = res.products;

        this.categories =
          [...new Set(this.allProducts.map(p => p.category))];

        this.applyFilters();

        this.loading = false;

      });

  }


  applyFilters() {

    const f = this.filterForm.value;

    let result = [...this.allProducts];

    if (f.search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(f.search.toLowerCase())
      );
    }

    if (f.category) {
      result = result.filter(p => p.category === f.category);
    }

    if (f.minPrice) {
      result = result.filter(p => p.price >= f.minPrice);
    }

    if (f.maxPrice) {
      result = result.filter(p => p.price <= f.maxPrice);
    }

    if (f.rating) {
      result = result.filter(p => p.rating >= f.rating);
    }

    if (f.inStock) {
      result = result.filter(p => p.stock > 0);
    }

    if (f.sort === 'priceAsc') {
      result.sort((a,b)=>a.price-b.price);
    }

    if (f.sort === 'priceDesc') {
      result.sort((a,b)=>b.price-a.price);
    }

    if (f.sort === 'rating') {
      result.sort((a,b)=>b.rating-a.rating);
    }

    this.filteredProducts = result;

    this.page = 1;
    this.visibleProducts =
      this.filteredProducts.slice(0,this.pageSize);

  }


  loadMore() {

    const next =
      this.filteredProducts.slice(
        0,
        this.pageSize * (this.page + 1)
      );

    this.visibleProducts = next;

    this.page++;

  }


  resetFilters() {

    this.filterForm.reset({
      search:'',
      category:'',
      minPrice:'',
      maxPrice:'',
      rating:'',
      inStock:false,
      sort:'relevance'
    });

  }


  @HostListener('window:scroll', [])
  onScroll() {

    const threshold = 300;

    const position =
      window.innerHeight + window.scrollY;

    const height =
      document.body.offsetHeight;

    if (position > height - threshold) {

      if (this.visibleProducts.length <
          this.filteredProducts.length) {

        this.loadMore();

      }

    }

  }

}
