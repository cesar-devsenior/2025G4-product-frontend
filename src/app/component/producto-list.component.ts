import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/producto';
import { ProductoCardComponent } from './producto-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent, RouterLink],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
      },
      error: (error) => {
        console.error("Ocurrió un error al hacer la peticion al backend: ", error);
        alert("Error al consultar los productos");
      }
    });
  }
}
