import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  inStock: boolean;
  onSale: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private categories = [
    'Electrónica',
    'Hogar',
    'Oficina',
    'Accesorios'
  ];

  getProducts(): Observable<Product[]> {

    const products: Product[] = [];

    for (let i = 1; i <= 20; i++) {

      const category =
        this.categories[Math.floor(Math.random() * this.categories.length)];

      const price = Math.floor(Math.random() * 200) + 50;

      const rating = Math.floor(Math.random() * 5) + 1;

      const onSale = Math.random() > 0.6;

      products.push({
        id: i,
        name: `Producto ${i}`,
        description: 'Descripción breve del producto.',
        category,
        price,
        oldPrice: onSale ? price + 40 : undefined,
        rating,
        inStock: Math.random() > 0.2,
        onSale,
        image: `https://picsum.photos/400/300?random=${i}`
      });

    }

    return of(products);
  }

}
