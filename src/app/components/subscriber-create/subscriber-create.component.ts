import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriberService } from '../../services/subscriber.service';
import { Subscriber } from '../../models/subscriber';

@Component({
  selector: 'app-subscriber-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Create New Subscriber</h2>
      <form (ngSubmit)="onSubmit()" #subscriberForm="ngForm">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            [(ngModel)]="subscriber.email"
            name="email"
            required
          >
        </div>
        
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            [(ngModel)]="subscriber.firstName"
            name="firstName"
            required
          >
        </div>
        
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            [(ngModel)]="subscriber.lastName"
            name="lastName"
            required
          >
        </div>

        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  `
})
export class SubscriberCreateComponent {
  subscriber: Subscriber = {
    email: '',
    firstName: '',
    lastName: ''
  };

  constructor(
    private subscriberService: SubscriberService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.subscriberService.createSubscriber(this.subscriber)
      .subscribe({
        next: () => {
          this.router.navigate(['/subscribers']);
        },
        error: (error) => {
          console.error('Error creating subscriber:', error);
        }
      });
  }
}