
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../../../../core/services/customers.service';

@Component({
  selector: 'app-mant-clientes',
  imports: [FormsModule],
  templateUrl: './mant-clientes.component.html',
  styleUrl: './mant-clientes.component.css'
})
export class MantClientesComponent implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  editCustomer: any = null;

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe(data => {
      this.customers = data.customers || data;
      console.log(this.customers);
    });
  }

  addCustomer(customer: any, form?: any) {
    this.customersService.createCustomer(customer).subscribe({
      next: (data: any) => {
        alert('Cliente creado exitosamente');
        this.customersService.getCustomers().subscribe(data => {
          this.customers = data.customers || data;
        });
        // Cierra el modal de agregar cliente
        const modal = document.getElementById('customerModal');
        if (modal) {
          // @ts-ignore
          const bsModal = window.bootstrap.Modal.getInstance(modal);
          if (bsModal) bsModal.hide();
        }
        if (form) {
          form.resetForm();
        }
      },
      error: (err) => {
        alert('Error al crear el cliente: ' + err.message);
      }
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
        this.customersService.getCustomers().subscribe(data => {
          this.customers = data.customers || data;
        });
        // Cierra el modal
        const modal = document.getElementById('editarClienteModal');
        if (modal) {
          // @ts-ignore
          const bsModal = window.bootstrap.Modal.getInstance(modal);
          bsModal.hide();
        }
      },
      error: (err) => {
        alert('Error al actualizar el cliente: ' + err.message);
      }
    });
  }

  eliminarCliente(item: any) {
    window.confirm(`¿Estás seguro de eliminar el cliente ${item.name}?`);
    then((result: any) => {
      if (result.isConfirmed) {
        this.customersService.deleteCustomer(item.id).subscribe({
          next: () => {
            alert('Cliente eliminado exitosamente');
            this.customersService.getCustomers().subscribe(data => {
              this.customers = data.customers || data;
            });
          },
          error: (err) => {
            alert('Error al eliminar el cliente: ' + err.message);
          }
        });
      }
    });
  }
}

function then(callback: (result: any) => void) {
  callback({ isConfirmed: true });
}
