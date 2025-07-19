import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  // Obtener productos (GET)
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear un producto (POST)
  createProduct(product: any): Observable<any> {
    // Set request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Make POST request with error handling
    return this.http.post<any>(
      this.apiUrl,        // API endpoint
      product,            // Request body
      { headers }         // Request headers
    ).pipe(
      catchError(error => {
        // Log and handle errors
        console.error('Error creating product:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to create product. Please try again later.'
        ));
      })
    );
  }

  // Actualizar un producto existente (PUT)
  updateProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Se asume que el producto tiene un id
    return this.http.put<any>(
      `${this.apiUrl}/${product.id}`,
      product,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to update product. Please try again later.'
        ));
      })
    );
  }

  // Eliminar un producto (DELETE)
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${productId}`
    ).pipe(
      catchError(error => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to delete product. Please try again later.'
        ));
      })
    );
  }
}
