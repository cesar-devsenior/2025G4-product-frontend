import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8080/api/productos');
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>('http://localhost:8080/api/productos', producto);
  }
}
