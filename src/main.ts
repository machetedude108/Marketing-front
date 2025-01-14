// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'subscribers', pathMatch: 'full' },
  { 
    path: 'subscribers', 
    loadComponent: () => import('./app/components/subscriber-list/subscriber-list.component')
      .then(m => m.SubscriberListComponent) 
  },
  { 
    path: 'create', 
    loadComponent: () => import('./app/components/subscriber-create/subscriber-create.component')
      .then(m => m.SubscriberCreateComponent) 
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));