import { Component, OnInit } from '@angular/core';
import { NewUserService } from '../../../../core/services/new-user.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../../core/services/new-user.service'; // Asegúrate de que la ruta sea correcta
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private newUserService: NewUserService) { }
  ngOnInit(): void {
  }

  addCustomer(customer: Customer) {
    this.newUserService.createCustomer(customer).subscribe((data: Customer) => {
      alert("Cliente agregado correctamente");
      console.log(data); // Ajusta según la estructura de la respuesta
    })
  }
}
