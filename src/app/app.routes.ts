import { Routes } from '@angular/router';
import {Productos} from './productos/productos';
import {Login} from './login/login'
import { Usuario } from './usuario/usuario';
import { Admin } from './admin/admin';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { Panel } from './panel/panel';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: Productos
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'usuario',
    component: Usuario,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard]
  },

  {
    path: 'panel',
    component: Panel
  },


  {
    path: '**',
    redirectTo: 'productos'
  }
];