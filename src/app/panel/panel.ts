import { Component, inject, signal, OnInit } from '@angular/core';
import { Productos } from '../services/productos';
import { producto, ProductInput } from '../models/productos.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html'
})
export class Panel implements OnInit {

  productos = signal<producto[]>([]);
  categories = signal<string[]>([]); // guardar categorias
  service = inject(Productos);
  editingId = signal<number | null>(null);
  error = signal<string>('');

  // Datos del formulario, enlazados con ngModel
  form: ProductInput = { title: '', price: 0, description: '', category: '', imageUrl: '' };

  ngOnInit(): void {
    this.cargarProductos();
    this.service.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarProductos(): void {
    this.service.obtenerProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  save(): void {
    this.error.set('');

if (
  !this.form.title?.trim() ||
  !this.form.category ||
  !this.form.imageUrl?.trim() ||
  this.form.price <= 0
) {
  this.error.set('Completa título, precio mayor a 0, categoría y URL de la imagen.');
  return;
}

    const id = this.editingId();
    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }

  // CREATE: agregar un producto
  private create(): void {
    this.service.crearProductos(this.form).subscribe({
      next: (product) => {
        const nuevoProducto: producto = {
          ...this.form,
          ...product,
          id: product.id ?? Date.now()
        };

        this.productos.update((list) => [nuevoProducto, ...list]);
        this.cancel();
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.error.set('No se pudo guardar el producto.');
      }
    });
  }

  // UPDATE: guardar los cambios de un producto
  private update(id: number): void {
    this.service.actualizarProductos(id, this.form).subscribe({
      next: (product) => {
        this.productos.update((list) =>
          list.map((item) => (item.id === id ? { ...item, ...this.form, ...product } : item))
        );
        this.cancel();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.error.set('No se pudo actualizar el producto.');
      }
    });
  }

  // Llena el formulario con el producto que se va a editar
edit(producto: producto) {
  this.editingId.set(producto.id);
  this.form = {
    title: producto.title,
    price: producto.price,
    category: producto.category,
    description: producto.description,
    imageUrl: producto.imageUrl || producto.imageUrl || ''
  };
}

  // Limpia el formulario y sale del modo edición
  cancel(): void {
    this.error.set('');
    this.editingId.set(null);
    this.form = {
  title: '',
  price: 0,
  category: '',
  imageUrl: '',
  description: ''
};
  }
}