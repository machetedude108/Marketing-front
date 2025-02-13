// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Marketing Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/subscribers" routerLinkActive="active">Subscribers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/workflows" routerLinkActive="active">Workflows</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'subscriber-frontend';
}