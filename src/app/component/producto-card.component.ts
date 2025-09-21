import { Component, Input } from '@angular/core';
import { Producto } from '../model/producto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
}
