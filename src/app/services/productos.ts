import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInput, producto } from '../models/productos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Productos {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

  // Retorna un Observable tipado con tu modelo
  obtenerProductos(): Observable<producto[]> {
    return this.http.get<producto[]>(this.apiUrl);
  }

  // Crear productos
  crearProductos(Producto: ProductInput) {
    return this.http.post<producto>(this.apiUrl, Producto);
  }

  // Actualizar productos
  actualizarProductos(id: number, Producto: ProductInput) {
    return this.http.put<producto>(`${this.apiUrl}/${id}`, Producto);
  }

  // Eliminar productos
  eliminarProductos(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}