// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container mt-4">
      <h1>Marketing Management</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'subscriber-frontend';
}