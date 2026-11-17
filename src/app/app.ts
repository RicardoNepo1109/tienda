import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Productos } from './productos/productos';
import { Navbar } from './navbar/navbar';
import { Panel } from './panel/panel';

@Component({
  imports: [RouterOutlet,Productos,Navbar,Panel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tienda');
}
