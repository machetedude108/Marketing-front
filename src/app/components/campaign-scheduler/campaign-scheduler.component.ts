// src/app/components/campaign-scheduler/campaign-scheduler.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomationService } from '../../services/automation.service';

@Component({
  selector: 'app-campaign-scheduler',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <br/>
    <div class="container mx-auto p-6">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-2">Schedule Campaign</h2>
          <p class="text-gray-600">Configure when and how often your campaign should run.</p>
        </div>

        <form [formGroup]="schedulerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Campaign ID -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Campaign ID
            </label>
            <input 
              type="number"
              formControlName="campaignId"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              [readonly]="!!prefilledCampaignId">
          </div>
<br/>
          <!-- Schedule Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Schedule Type
            </label>
            <select 
              formControlName="scheduleType"
              (change)="onScheduleTypeChange()"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="interval">Interval Based</option>
              <option value="cron">Cron Expression</option>
            </select>
          </div>
<br/>
          <!-- Interval Settings -->
          <div *ngIf="schedulerForm.get('scheduleType')?.value === 'interval'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Run Every (seconds)
            </label>
            <input 
              type="number"
              formControlName="intervalInSeconds"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3600 for 1 hour">
            <p class="mt-1 text-sm text-gray-500">
              Common intervals: 1 hour (3600), 1 day (86400), 1 week (604800)
            </p>
          </div>
<br/>
          <!-- Cron Expression -->
          <div *ngIf="schedulerForm.get('scheduleType')?.value === 'cron'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Cron Expression
            </label>
            <input 
              type="text"
              formControlName="cronExpression"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 0 0 * * * ?">
            <p class="mt-1 text-sm text-gray-500">
              Format: Seconds Minutes Hours Day-of-Month Month Day-of-Week Year
            </p>
          </div>
<br/>
          <!-- Start Date/Time -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Start Date/Time
            </label>
            <input 
              type="datetime-local"
              formControlName="startAt"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
<br/>
          <!-- End Date/Time -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              End Date/Time (Optional)
            </label>
            <input 
              type="datetime-local"
              formControlName="endAt"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
<br/>
          <!-- Repeat Count -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Repeat Count (Optional)
            </label>
            <input 
              type="number"
              formControlName="repeatCount"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave empty for infinite repeats">
          </div>
<br/>
          <!-- Error Message -->
          <div *ngIf="errorMessage" class="text-red-500 text-sm mt-2">
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="text-green-500 text-sm mt-2">
            {{ successMessage }}
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button 
              type="button"
              (click)="onCancel()"
              class="btn btn-light text-secondary">
              Cancel
            </button>
            <button 
              type="submit"
              [disabled]="!schedulerForm.valid || isSubmitting"
              class="btn btn-primary">
              {{ isSubmitting ? 'Scheduling...' : 'Schedule Campaign' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CampaignSchedulerComponent implements OnInit {
  schedulerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  prefilledCampaignId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private automationService: AutomationService
  ) {
    this.schedulerForm = this.fb.group({
      campaignId: ['', Validators.required],
      scheduleType: ['interval'],
      intervalInSeconds: [3600],
      cronExpression: [''],
      startAt: [''],
      endAt: [''],
      repeatCount: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['campaignId']) {
        this.prefilledCampaignId = params['campaignId'];
        this.schedulerForm.patchValue({
          campaignId: params['campaignId']
        });
      }
    });
  }

  onScheduleTypeChange() {
    const scheduleType = this.schedulerForm.get('scheduleType')?.value;
    
    if (scheduleType === 'interval') {
      this.schedulerForm.get('cronExpression')?.setValidators(null);
      this.schedulerForm.get('intervalInSeconds')?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.schedulerForm.get('intervalInSeconds')?.setValidators(null);
      this.schedulerForm.get('cronExpression')?.setValidators([Validators.required]);
    }
    
    this.schedulerForm.get('cronExpression')?.updateValueAndValidity();
    this.schedulerForm.get('intervalInSeconds')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.schedulerForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.schedulerForm.value;
      const scheduleRequest = {
        startAt: formValue.startAt,
        endAt: formValue.endAt,
        repeatCount: formValue.repeatCount,
        ...(formValue.scheduleType === 'interval'
          ? { intervalInSeconds: formValue.intervalInSeconds }
          : { cronExpression: formValue.cronExpression })
      };

      this.automationService.triggerCampaign(formValue.campaignId, scheduleRequest)
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.successMessage = 'Campaign scheduled successfully!';
            setTimeout(() => {
              this.router.navigate(['/campaigns']);
            }, 2000);
          },
          error: (error) => {
            this.isSubmitting = false;
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  onCancel() {
    this.router.navigate(['/campaigns']);
  }
}