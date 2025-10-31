import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mant-productos',
  templateUrl: './mant-productos.component.html',
  styleUrls: ['./mant-productos.component.css'],
  imports: [FormsModule]
})
export class MantProductosComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  editProduct: any = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      this.products = data.products || data;
    });
  }

  addProduct(product: any, form?: any) {
    this.productsService.createProduct(product).subscribe({
      next: (data: any) => {
        alert('Producto creado exitosamente');
        this.productsService.getProducts().subscribe(data => {
          this.products = data.products || data;
        });
        // Cierra el modal de agregar producto
        const modal = document.getElementById('productModal');
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
        alert('Error al crear el producto: ' + err.message);
      }
    });
  }

  verProducto(item: any) {
    this.selectedProduct = item;
    const modal = document.getElementById('verProductoModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  abrirEditarProducto(item: any) {
    this.editProduct = { ...item };
    const modal = document.getElementById('editarProductoModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new window.bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  updateProduct(form: any) {
    this.productsService.updateProduct(this.editProduct).subscribe({
      next: () => {
        alert('Producto actualizado exitosamente');
        this.productsService.getProducts().subscribe(data => {
          this.products = data.products || data;
        });
        // Cierra el modal
        const modal = document.getElementById('editarProductoModal');
        if (modal) {
          // @ts-ignore
          const bsModal = window.bootstrap.Modal.getInstance(modal);
          bsModal.hide();
        }
      },
      error: (err) => {
        alert('Error al actualizar el producto: ' + err.message);
      }
    });
  }

  eliminarProducto(item: any) {
    window.confirm(`¿Estás seguro de eliminar el producto ${item.name}?`);
    then((result: any) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(item.id).subscribe({
          next: () => {
            alert('Producto eliminado exitosamente');
            this.productsService.getProducts().subscribe(data => {
              this.products = data.products || data;
            });
          },
          error: (err) => {
            alert('Error al eliminar el producto: ' + err.message);
          }
        });
      }
    });
  }
}

function then(callback: (result: any) => void) {
  callback({ isConfirmed: true });
}

