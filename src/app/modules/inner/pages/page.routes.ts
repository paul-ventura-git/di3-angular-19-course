import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../../core/guards/has-role.guard'; // Roles based guard

export default [
  {
    path: '',
    loadComponent: () => import('./mascotas/mascotas.component').then(m => m.MascotasComponent), // public
  },
  {
    path: 'citas',
    canActivate: [hasRoleGuard(['veterinary', 'admin'])],
    loadComponent: () => import('./citas/citas.component').then(m => m.CitasComponent), // sales
  },
  {
    path: 'historial',
    canActivate: [hasRoleGuard(['veterinary', 'admin'])],
    loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent), // manager
  },
  {
    path: 'admin',
    canActivate: [hasRoleGuard(['admin'])],
    loadComponent: () => import('./admin/admin'), // admin
  },
  {
    path: 'formNuevaMascota',
    canActivate: [hasRoleGuard(['veterinary', 'admin'])],
    loadComponent: () => import('../components/form-nueva-mascota/form-nueva-mascota.component').then(m => m.FormNuevaMascotaComponent), // admin
  }
] as Routes;

