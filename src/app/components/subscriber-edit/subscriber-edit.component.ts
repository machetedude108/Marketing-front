import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriberService } from '../../services/subscriber.service';
import { Subscriber } from '../../models/subscriber';

@Component({
  selector: 'app-subscriber-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Edit Subscriber</h2>
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

        <button type="submit" class="btn btn-primary me-2">Update</button>
        <button type="button" class="btn btn-secondary" (click)="goBack()">Cancel</button>
      </form>
    </div>
  `
})
export class SubscriberEditComponent implements OnInit {
  subscriber: Subscriber = {
    email: '',
    firstName: '',
    lastName: ''
  };
  id: number = 0;

  constructor(
    private subscriberService: SubscriberService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadSubscriber();
    });
  }

  loadSubscriber(): void {
    this.subscriberService.getSubscriberById(this.id)
      .subscribe({
        next: (data) => {
          this.subscriber = data;
        },
        error: (error) => {
          console.error('Error loading subscriber:', error);
        }
      });
  }

  onSubmit(): void {
    this.subscriberService.updateSubscriber(this.id, this.subscriber)
      .subscribe({
        next: () => {
          this.router.navigate(['/subscribers']);
        },
        error: (error) => {
          console.error('Error updating subscriber:', error);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/subscribers']);
  }
}