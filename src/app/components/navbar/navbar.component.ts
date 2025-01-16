import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Email Campaign Manager</a>
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
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class NavbarComponent {}