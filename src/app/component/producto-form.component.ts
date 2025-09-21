import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      imagenUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)]]
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      console.log('Formulario válido:', this.productoForm.value);
      
      // Aquí puedes agregar la lógica para enviar los datos
      const body: Producto = this.productoForm.value;
      this.productoService.createProducto(body).subscribe({
        next: (datos) => {
          alert('Producto creado exitosamente!');
          this.productoForm.reset();
          // Ir a la pagina de listado
          this.router.navigateByUrl('/productos');
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          alert('Error al crear el producto!');
        }
      });
    } else {
        console.log('Formulario inválido');
        this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productoForm.controls).forEach(key => {
      const control = this.productoForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.productoForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es obligatorio`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} debe ser mayor a 0`;
      }
      if (field.errors['pattern']) {
        return `${this.getFieldLabel(fieldName)} debe ser una URL válida de imagen`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'nombre': 'El nombre',
      'precio': 'El precio',
      'imagenUrl': 'La URL de la imagen'
    };
    return labels[fieldName] || fieldName;
  }
}
