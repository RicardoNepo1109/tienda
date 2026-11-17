import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡Muy importante para usar [(ngModel)]!
import { Auth } from '../services/auth';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private servicio = inject(Auth);
  loading = signal(false)
  error = signal('')

  // Objeto para capturar los datos del formulario
  credenciales = {
    usuario: '',
    password: ''
  };

  // Función que se ejecuta al darle clic al botón "Ingresar"
  iniciarSesion() {
    if (this.credenciales.usuario === '') {
      alert('Por favor, selecciona un tipo de usuario válido.');
      return;
    }

    console.log('Intentando iniciar sesión con los siguientes datos:');
    console.log('Rol seleccionado:', this.credenciales.usuario, 'contrasena', this.credenciales.password);
    this.loading.set(true)
    // Llamada al servicio 'Auth' con sus parámetros correspondientes
    this.servicio.login(this.credenciales.usuario, this.credenciales.password).subscribe({
      next: () => {
        // Cuando todo sale bien
        this.loading.set(false);
        console.log("Listo");
      },
      error: (error) => {
        this.loading.set(false)
        this.error.set( error.status=== 401 ? 'Usuario o contraseña incorrecta' :
         'No se puede conectar espera más tarde')
      }
    });
  }
}