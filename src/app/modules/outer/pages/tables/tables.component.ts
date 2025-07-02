import { Component, input, OnInit } from '@angular/core';
import { NewUserService } from '../../../../core/services/new-user.service';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../../interfaces/interfaceCustomer'; // Adjust the import path as necessary
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tables',
  imports: [FormsModule, CommonModule, RouterModule, RouterLink],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
  users: any[] = [];
  customers : Customer[] = []; // Array to hold customers

  customer = input.required<Customer>();

  constructor(private userService: UserService, private newUserService: NewUserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.customers;
      this.customers = data.customers; // Assigning the fetched customers to the customers array
    });
    this.getUserById('952104fed4bc564e913c73255aa00dbf');
    //this.createUser({name: 'John Doe', email: 'abc@abc.com'})
  }

  /**
   * Este identificador de método (definido aquí) se utiliza para obtener un usuario por su ID.
   * @param id
   */
  getUserById(id: any) {
    this.userService.getUserById(id).subscribe(data => {
      console.log(data);
    });
  }

  createUser(customer: Customer) {
    this.userService.createUser(customer).subscribe(data => {
      console.log(data);
    });
  }

  updateUser(id: any, customer: Customer) {
    this.userService.updateUser(id, customer).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Este identificador de método (definido aquí) se utiliza para agregar un nuevo cliente.
   * @param customer
   */
  /*
  addCustomer(customer: Customer) {
    this.newUserService.createCustomer(customer).subscribe((data: Customer) => {
      console.log(data);
    })
  }
*/
}


