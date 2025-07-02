import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../interfaces/interfaceCustomer'; // Adjust the import path as necessary}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private apiUrl = 'https://dummyjson.com/users';
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(customer: Customer): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }
/*
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
    */
}
