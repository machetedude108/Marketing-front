import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Create New Campaign</h2>
      <form (ngSubmit)="onSubmit()" #campaignForm="ngForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            [(ngModel)]="campaign.name"
            name="name"
            required
          >
        </div>
       
        <div class="mb-3">
          <label for="type" class="form-label">Type</label>
          <select
            class="form-control"
            id="type"
            [(ngModel)]="campaign.type"
            name="type"
            required
          >
            <option value="">Select a type</option>
            <option *ngFor="let type of campaignTypes" [value]="type">
              {{type}}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="startDate" class="form-label">Start Date</label>
          <input
            type="date"
            class="form-control"
            id="startDate"
            [(ngModel)]="campaign.startDate"
            name="startDate"
            required
          >
        </div>

        <div class="mb-3">
          <label for="endDate" class="form-label">End Date</label>
          <input
            type="date"
            class="form-control"
            id="endDate"
            [(ngModel)]="campaign.endDate"
            name="endDate"
            required
          >
        </div>

        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select
            class="form-control"
            id="status"
            [(ngModel)]="campaign.status"
            name="status"
            required
          >
            <option value="">Select a status</option>
            <option *ngFor="let status of campaignStatuses" [value]="status">
              {{status}}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <textarea
            class="form-control"
            id="content"
            [(ngModel)]="campaign.content"
            name="content"
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary me-2">Create</button>
        <button type="button" class="btn btn-secondary" (click)="goBack()">Cancel</button>
      </form>
    </div>
  `
})
export class CampaignCreateComponent {
  campaign: Campaign = {
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    status: '',
    content: ''
  };

  // Define available options for dropdowns
  campaignTypes: string[] = [
    'Email',
    'Content Marketing',
    'Event'
  ];

  campaignStatuses: string[] = [
    'Active',
    'Inactive'
  ];

  constructor(
    private campaignService: CampaignService,
    public router: Router  // Changed from private to public
  ) { }

  onSubmit(): void {
    this.campaignService.createCampaign(this.campaign)
      .subscribe({
        next: () => {
          this.router.navigate(['/campaigns']);
        },
        error: (error) => {
          console.error('Error creating campaign:', error);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/campaigns']);
  }
}