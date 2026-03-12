import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CustomersService } from '../../../../core/services/customers.service';
import { Customer } from '../../../../entity/Customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
})
export class HistorialComponent implements OnInit {
  /** ======================== DATOS CRUD ======================== **/
  customers = signal<Customer[]>([]); // todos los clientes cargados
  selectedCustomer: any = null;
  editCustomer: any = null;

  /** ======================== BUSCADOR ======================== **/
  searchControl = new FormControl('');
  // 👇 Convertimos el observable valueChanges a signal reactivo
  searchValue = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  // 💡 computed se recalcula automáticamente cada vez que searchValue cambia
  filteredCustomers = computed(() => {
    const query = this.searchValue()?.toLowerCase() ?? '';
    return this.customers().filter(customer =>
      Object.values(customer).some(val =>
        String(val).toLowerCase().includes(query)
      )
    );
  });

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  /** ======================== MÉTODOS CRUD ======================== **/
  loadCustomers() {
    this.customersService.getCustomers().subscribe(data => {
      this.customers.set(data.customers || data);
    });
  }

  addCustomer(customer: any, form?: any) {
    this.customersService.createCustomer(customer).subscribe({
      next: () => {
        alert('Cliente creado exitosamente');
        this.loadCustomers();
        const modal = document.getElementById('customerModal');
        if (modal) {
          // @ts-ignore
          const bsModal = window.bootstrap.Modal.getInstance(modal);
          if (bsModal) bsModal.hide();
        }
        form?.resetForm();
      },
      error: err => alert('Error al crear el cliente: ' + err.message)
    });
  }

  verCliente(item: any) {
    this.selectedCustomer = item;
    const modal = document.getElementById('verClienteModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  abrirEditarCliente(item: any) {
    this.editCustomer = { ...item };
    const modal = document.getElementById('editarClienteModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  updateCustomer(form: any) {
    this.customersService.updateCustomer(this.editCustomer).subscribe({
      next: () => {
        alert('Cliente actualizado exitosamente');
        this.loadCustomers();
        const modal = document.getElementById('editarClienteModal');
        if (modal) {
          // @ts-ignore
          const bsModal = window.bootstrap.Modal.getInstance(modal);
          if (bsModal) bsModal.hide();
        }
      },
      error: err => alert('Error al actualizar el cliente: ' + err.message)
    });
  }

  eliminarCliente(item: any) {
    if (window.confirm(`¿Estás seguro de eliminar el cliente ${item.name}?`)) {
      this.customersService.deleteCustomer(item.id).subscribe({
        next: () => {
          alert('Cliente eliminado exitosamente');
          this.loadCustomers();
        },
        error: err => alert('Error al eliminar el cliente: ' + err.message)
      });
    }
  }
}
