import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Define the Customer interface for type safety
export interface Customer {
  id: number;          // Required field
  name: string;          // Required field
  email: string;         // Required field
  phone?: string;        // Optional field
  address?: string;      // Optional field
}

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<Customer> {
    // Set request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Make POST request with error handling
    return this.http.post<Customer>(
      this.apiUrl,        // API endpoint
      customer,           // Request body
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
}
