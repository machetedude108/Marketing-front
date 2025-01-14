// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'azea', pathMatch: 'full' },
  { 
    path: 'subscribers', 
    loadComponent: () => import('./app/components/subscriber-list/subscriber-list.component')
      .then(m => m.SubscriberListComponent) 
  },
  {
    path: 'subscribers/:id',
    loadComponent: () => import('./app/components/subscriber-edit/subscriber-edit.component')
      .then(m => m.SubscriberEditComponent)
  },
  { 
    path: 'create', 
    loadComponent: () => import('./app/components/subscriber-create/subscriber-create.component')
      .then(m => m.SubscriberCreateComponent) 
  },
  {
    path: 'campaigns',
    loadComponent: () => import('./app/components/campaign-list/campaign-list.component')
      .then(m => m.CampaignListComponent)
  },
  {
    path: 'campaigns/create',
    loadComponent: () => import('./app/components/campaign-create/campaign-create.component')
      .then(m => m.CampaignCreateComponent)
  },
  {
    path: 'campaigns/:id',
    loadComponent: () => import('./app/components/campaign-edit/campaign-edit.component')
      .then(m => m.CampaignEditComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));