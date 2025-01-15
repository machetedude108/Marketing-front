// src/app/components/campaign-scheduler/campaign-scheduler.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutomationService } from '../../services/automation.service';

@Component({
  selector: 'app-campaign-scheduler',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4">
      <form [formGroup]="schedulerForm" (ngSubmit)="onSubmit()" class="max-w-md mx-auto">
        <div class="mb-4">
          <label class="block mb-2">Campaign ID</label>
          <input type="number" formControlName="campaignId" 
                 class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Schedule Type</label>
          <select formControlName="scheduleType" 
                  class="w-full p-2 border rounded">
            <option value="interval">Interval</option>
            <option value="cron">Cron Expression</option>
          </select>
        </div>

        <ng-container *ngIf="schedulerForm.get('scheduleType')?.value === 'interval'">
          <div class="mb-4">
            <label class="block mb-2">Interval (seconds)</label>
            <input type="number" formControlName="intervalInSeconds" 
                   class="w-full p-2 border rounded">
          </div>
        </ng-container>

        <ng-container *ngIf="schedulerForm.get('scheduleType')?.value === 'cron'">
          <div class="mb-4">
            <label class="block mb-2">Cron Expression</label>
            <input type="text" formControlName="cronExpression" 
                   class="w-full p-2 border rounded">
          </div>
        </ng-container>

        <div class="mb-4">
          <label class="block mb-2">Start At</label>
          <input type="datetime-local" formControlName="startAt" 
                 class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">End At</label>
          <input type="datetime-local" formControlName="endAt" 
                 class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Repeat Count</label>
          <input type="number" formControlName="repeatCount" 
                 class="w-full p-2 border rounded">
        </div>

        <button type="submit" 
                class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Schedule Campaign
        </button>
      </form>
    </div>
  `
})
export class CampaignSchedulerComponent {
  schedulerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  onSubmit() {
    if (this.schedulerForm.valid) {
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
            console.log('Campaign scheduled successfully:', response);
            // Add success notification here
          },
          error: (error) => {
            console.error('Error scheduling campaign:', error);
            // Add error notification here
          }
        });
    }
  }
}