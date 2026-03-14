import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../../core/guards/has-role.guard'; // Roles based guard

export default [
  {
    path: '',
    loadComponent: () => import('./mascotas/mascotas.component').then(m => m.MascotasComponent), // public
  },
  {
    path: 'ventas',
    canActivate: [hasRoleGuard(['cashier', 'admin'])],
    loadComponent: () => import('./ventas/ventas.component').then(m => m.VentasComponent), // sales
  },
  {
    path: 'historial',
    canActivate: [hasRoleGuard(['cashier', 'admin'])],
    loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent), // manager
  },
  {
    path: 'admin',
    canActivate: [hasRoleGuard(['admin'])],
    loadComponent: () => import('./admin/admin'), // admin
  },
  {
    path: 'clientes',
    canActivate: [hasRoleGuard(['admin'])],
    loadComponent: () => import('./mant-clientes/mant-clientes.component').then(m => m.MantClientesComponent), // admin
  },
  {
    path: 'productos',
    canActivate: [hasRoleGuard(['admin'])],
    loadComponent: () => import('./mant-productos/mant-productos.component').then(m => m.MantProductosComponent), // admin
  },
  {
    path: 'formNuevaMascota',
    canActivate: [hasRoleGuard(['cashier', 'admin'])],
    loadComponent: () => import('../components/form-nueva-mascota/form-nueva-mascota.component').then(m => m.FormNuevaMascotaComponent), // admin
  }
] as Routes;

