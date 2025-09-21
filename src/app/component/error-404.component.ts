import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.css'
})
export class Error404Component {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
