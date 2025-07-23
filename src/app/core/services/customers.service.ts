import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) { }


  // Obtener clientes (GET)
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear un cliente (POST)
  createCustomer(customer: any): Observable<any> {
    // Set request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Make POST request with error handling
    return this.http.post<any>(
      this.apiUrl,        // API endpoint
      customer,            // Request body
      { headers }         // Request headers
    ).pipe(
      catchError(error => {
        // Log and handle errors
        console.error('Error creating customer:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to create customer. Please try again later.'
        ));
      })
    );
  }

  // Actualizar un cliente existente (PUT)
  updateCustomer(customer: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Se asume que el cliente tiene un id
    return this.http.put<any>(
      `${this.apiUrl}/${customer.id}`,
      customer,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Error updating customer:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to update customer. Please try again later.'
        ));
      })
    );
  }

  // Eliminar un cliente (DELETE)
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${customerId}`
    ).pipe(
      catchError(error => {
        console.error('Error deleting customer:', error);
        return throwError(() => new Error(
          error.error?.message ||
          'Failed to delete customer. Please try again later.'
        ));
      })
    );
  }


}
