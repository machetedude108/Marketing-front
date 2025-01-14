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
          <input
            type="text"
            class="form-control"
            id="type"
            [(ngModel)]="campaign.type"
            name="type"
            required
          >
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
          <input
            type="text"
            class="form-control"
            id="status"
            [(ngModel)]="campaign.status"
            name="status"
            required
          >
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

        <button type="submit" class="btn btn-primary">Create</button>
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

  constructor(
    private campaignService: CampaignService,
    private router: Router
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
}
