import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-ventas',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './ventas.component.html'
})

export class VentasComponent {

  formVenta: FormGroup;

  tasaIGV = 0.18;

  productos = [
    { nombre: "Laptop", precio: 3500 },
    { nombre: "Mouse", precio: 50 },
    { nombre: "Teclado", precio: 120 },
    { nombre: "Monitor", precio: 900 }
  ];

  constructor(private fb: FormBuilder) {
    this.formVenta = this.fb.group({
      codigo: [''],
      fechaHora: [''],
      cliente: [''],

      detalle: this.fb.array([]),
      monto: [{value:0, disabled:true}]
    });
    this.agregarProducto();
  }

  get detalle(): FormArray {

    return this.formVenta.get('detalle') as FormArray;

  }

  crearFila(): FormGroup {
    return this.fb.group({
      producto: ['', Validators.required],
      precio: [{value:0, disabled:true}],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      igv: [{value:0, disabled:true}],
      subtotal: [{value:0, disabled:true}]
    });
  }

  agregarProducto() {
    this.detalle.push(this.crearFila());
  }

  eliminarProducto(index:number) {
    this.detalle.removeAt(index);
    this.calcularTotal();
  }

  seleccionarProducto(index:number) {
    const fila = this.detalle.at(index);
    const nombreProducto = fila.get('producto')?.value;
    const encontrado = this.productos.find(p => p.nombre === nombreProducto);

    if(encontrado){
      fila.get('precio')?.setValue(encontrado.precio);
    }
    this.calcularFila(index);
  }

  calcularFila(index:number){
    const fila = this.detalle.at(index);

    const precio = fila.get('precio')?.value || 0;
    const cantidad = fila.get('cantidad')?.value || 0;

    const base = precio * cantidad;
    const igv = base * this.tasaIGV;
    const subtotal = base + igv;

    fila.get('igv')?.setValue(igv);
    fila.get('subtotal')?.setValue(subtotal);

    this.calcularTotal();
  }

  calcularTotal(){
    let total = 0;

    this.detalle.controls.forEach(fila => {
      total += fila.get('subtotal')?.value || 0;
    });

    this.formVenta.get('monto')?.setValue(total);
  }
}
