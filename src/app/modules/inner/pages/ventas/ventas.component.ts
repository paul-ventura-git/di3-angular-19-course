import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../entity/Product';

@Component({
selector: 'app-ventas',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './ventas.component.html'
})

export class VentasComponent implements OnInit {
  formVenta: FormGroup;
  tasaIGV = 0.18;
  productos: Product[] = [];

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.formVenta = this.fb.group({
      codigo: [''],
      fechaHora: [''],
      nombreCliente: [''],
      dniCliente: [''],
      telefonoCliente: [''],
      emailCliente: [''],
      detalle: this.fb.array([]),
      monto: [{value:0, disabled:true}]
    });
    this.agregarProducto();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.productos = data.products || data;
    });
  }


  get detalle(): FormArray {
    return this.formVenta.get('detalle') as FormArray;
  }

  agregarProducto() {
    this.detalle.push(this.crearFila());
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

  eliminarProducto(index:number) {
    this.detalle.removeAt(index);
    this.calcularTotal();
  }

  seleccionarProducto(index:number) {
    const fila = this.detalle.at(index);
    const nombreProducto = fila.get('producto')?.value;
    const encontrado = this.productos.find(p => p.title === nombreProducto);

    if(encontrado){
      fila.get('precio')?.setValue(encontrado.price);
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
