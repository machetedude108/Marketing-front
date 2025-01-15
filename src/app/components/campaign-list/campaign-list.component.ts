import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h2>Campaigns</h2>
      <a routerLink="/campaigns/create" class="btn btn-primary mb-3">Add New Campaign</a>
      
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let campaign of campaigns">
            <td>{{ campaign.id }}</td>
            <td>{{ campaign.name }}</td>
            <td>{{ campaign.type }}</td>
            <td>{{ campaign.startDate }}</td>
            <td>{{ campaign.endDate }}</td>
            <td>{{ campaign.status }}</td>
            <td>
              <a [routerLink]="['/campaigns', campaign.id]" class="btn btn-info btn-sm me-2">Edit</a>
              <button (click)="deleteCampaign(campaign.id!)" class="btn btn-danger btn-sm">Delete</button>
              <button (click)="sendCampaign(campaign.id!)" class="btn btn-success btn-sm">Send</button>
              <button [routerLink]="['/campaigns/schedule']"
                      [queryParams]="{campaignId: campaign.id}"
                      class="btn btn-purple btn-sm">
                Schedule
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  
  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns()
      .subscribe({
        next: (data) => {
          this.campaigns = data;
        },
        error: (error) => {
          console.error('Error fetching campaigns:', error);
        }
      });
  }

  deleteCampaign(id: number): void {
    if (confirm('Are you sure you want to delete this campaign?')) {
      this.campaignService.deleteCampaign(id)
        .subscribe({
          next: () => {
            this.loadCampaigns();
          },
          error: (error) => {
            console.error('Error deleting campaign:', error);
          }
        });
    }
  }
  sendCampaign(id: number): void {
    const confirmed = window.confirm('Are you sure you want to send this campaign?');
    
    if (confirmed) {
      this.campaignService.sendCampaign(id)
        .subscribe({
          next: (response) => {
            alert('Campaign sent successfully!');
            console.log('Campaign sent successfully:', response);
          },
          error: (error) => {
            console.error('Error response:', error);
            if (error.status === 200 || error.status === 201) {
              alert('Campaign sent successfully!');
            } else {
              alert('Error sending campaign. Please try again later.');
            }
          }
        });
    } else {
      console.log('Campaign send action canceled.');
    }
  }
  
}
