import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriberService } from '../../services/subscriber.service';
import { Subscriber } from '../../models/subscriber';

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Subscribers</h2>
      <a routerLink="/create" class="btn btn-primary mb-3">Add New Subscriber</a>
      
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let subscriber of subscribers">
            <td>{{ subscriber.id }}</td>
            <td>{{ subscriber.email }}</td>
            <td>{{ subscriber.firstName }}</td>
            <td>{{ subscriber.lastName }}</td>
            <td>
              <a [routerLink]="['/subscribers', subscriber.id]" class="btn btn-info btn-sm me-2">Edit</a>
              <button (click)="deleteSubscriber(subscriber.id!)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class SubscriberListComponent implements OnInit {
  subscribers: Subscriber[] = [];
  
  constructor(private subscriberService: SubscriberService) { }

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers(): void {
    this.subscriberService.getAllSubscribers()
      .subscribe({
        next: (data) => {
          this.subscribers = data;
        },
        error: (error) => {
          console.error('Error fetching subscribers:', error);
        }
      });
  }

  deleteSubscriber(id: number): void {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      this.subscriberService.deleteSubscriber(id)
        .subscribe({
          next: () => {
            this.loadSubscribers();
          },
          error: (error) => {
            console.error('Error deleting subscriber:', error);
          }
        });
    }
  }
}