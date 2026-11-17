import { Component,inject,signal } from '@angular/core';
import { Productos as productosService } from '../services/productos';
import { producto } from '../models/productos.model';
@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
   private productoService = inject(productosService);
  
  // Guardamos los productos en una señal reactiva
  productos = signal<producto[]>([]);
  cargando = signal<boolean>(true);

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar la API', err);
        this.cargando.set(false);
      }
    });
  }
}
