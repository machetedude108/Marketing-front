import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';

interface CampaignMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  draftCampaigns: number;
  completedCampaigns: number;
  upcomingCampaigns: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-4">
      <!-- Quick Stats -->
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="card bg-primary text-white h-100">
            <div class="card-body">
              <h5 class="card-title">Active Campaigns</h5>
              <h2 class="display-4">{{metrics.activeCampaigns}}</h2>
              <p class="card-text">Currently running campaigns</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-success text-white h-100">
            <div class="card-body">
              <h5 class="card-title">Upcoming Campaigns</h5>
              <h2 class="display-4">{{metrics.upcomingCampaigns}}</h2>
              <p class="card-text">Scheduled to start soon</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-info text-white h-100">
            <div class="card-body">
              <h5 class="card-title">Total Campaigns</h5>
              <h2 class="display-4">{{metrics.totalCampaigns}}</h2>
              <p class="card-text">Across all statuses</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Campaigns -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Recent Campaigns</h5>
            </div>
            <div class="card-body">
              <div class="list-group">
                <a *ngFor="let campaign of recentCampaigns" 
                   [routerLink]="['/campaigns', campaign.id]"
                   class="list-group-item list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{campaign.name}}</h6>
                    <small [ngClass]="{
                      'text-success': campaign.status === 'Active',
                      'text-warning': campaign.status === 'Draft',
                      'text-info': campaign.status === 'Scheduled'
                    }">{{campaign.status}}</small>
                  </div>
                  <small>Type: {{campaign.type}}</small>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Campaign Status Distribution</h5>
            </div>
            <div class="card-body">
              <div class="mb-3" *ngFor="let status of campaignStatusData">
                <div class="d-flex justify-content-between mb-1">
                  <span>{{status.name}}</span>
                  <span>{{status.percentage}}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar" 
                       [ngClass]="status.class"
                       [style.width.%]="status.percentage"
                       role="progressbar">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="d-flex gap-2">
                <button routerLink="/campaigns/create" class="btn btn-primary">
                  Create New Campaign
                </button>
                <button routerLink="/campaigns" class="btn btn-secondary">
                  View All Campaigns
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class DashboardComponent implements OnInit {
  metrics: CampaignMetrics = {
    totalCampaigns: 0,
    activeCampaigns: 0,
    draftCampaigns: 0,
    completedCampaigns: 0,
    upcomingCampaigns: 0
  };

  recentCampaigns: Campaign[] = [];

  campaignStatusData = [
    { name: 'Active', percentage: 0, class: 'bg-success' },
    { name: 'Draft', percentage: 0, class: 'bg-warning' },
    { name: 'Scheduled', percentage: 0, class: 'bg-info' },
    { name: 'Completed', percentage: 0, class: 'bg-secondary' }
  ];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.campaignService.getCampaigns().subscribe({
      next: (campaigns) => {
        // Calculate metrics
        this.metrics.totalCampaigns = campaigns.length;
        this.metrics.activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
        this.metrics.draftCampaigns = campaigns.filter(c => c.status === 'Draft').length;
        this.metrics.completedCampaigns = campaigns.filter(c => c.status === 'Completed').length;
        this.metrics.upcomingCampaigns = campaigns.filter(c => c.status === 'Scheduled').length;

        // Get recent campaigns
        this.recentCampaigns = campaigns
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
          .slice(0, 5);

        // Calculate percentages for status distribution
        this.updateStatusDistribution(campaigns);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  private updateStatusDistribution(campaigns: Campaign[]): void {
    const total = campaigns.length;
    if (total === 0) return;

    // Define a type for the status counts
    type StatusCountsType = {
        [key: string]: number;
    };

    const statusCounts: StatusCountsType = {
        'Active': campaigns.filter(c => c.status === 'Active').length,
        'Draft': campaigns.filter(c => c.status === 'Draft').length,
        'Scheduled': campaigns.filter(c => c.status === 'Scheduled').length,
        'Completed': campaigns.filter(c => c.status === 'Completed').length
    };

    this.campaignStatusData = this.campaignStatusData.map(status => ({
        ...status,
        percentage: Math.round((statusCounts[status.name] / total) * 100)
    }));
}
}