import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../../../../core/services/new-user.service';
import { UserService } from '../../../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../../core/services/new-user.service';
@Component({
  selector: 'app-tables',
  imports: [FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
  users: any[] = [];
  myId: number = 0;

  constructor(private userService: UserService, private newUserService: NewUserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.customers; // Ajusta según la estructura de la respuesta
    });
  }

  addCustomer(customer: Customer) {
    this.newUserService.createCustomer(customer).subscribe((data: Customer) => {
      console.log(data); // Ajusta según la estructura de la respuesta
    })
  }

}

