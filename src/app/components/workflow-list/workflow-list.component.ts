// Create new file: src/app/components/workflow-list/workflow-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomationService } from '../../services/automation.service';
import { Workflow } from '../../models/schedule-request';  // Use your existing model

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Active Automations</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2">Workflow ID</th>
              <th class="px-4 py-2">Campaign</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Schedule</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let workflow of workflows" class="border-t">
              <td class="px-4 py-2">{{workflow.id}}</td>
              <td class="px-4 py-2">{{workflow.actionType}}</td>
              <td class="px-4 py-2">{{workflow.triggerType}}</td>
              <td class="px-4 py-2">
                <span *ngIf="workflow.cronExpression">{{workflow.cronExpression}}</span>
                <span *ngIf="workflow.intervalInSeconds">Every {{workflow.intervalInSeconds}}s</span>
              </td>
              <td class="px-4 py-2">
                <span [class]="getStatusClass(workflow.status)">
                  {{workflow.status}}
                </span>
              </td>
              <td class="px-4 py-2">
                <button 
                  *ngIf="workflow.status === 'ACTIVE'"
                  (click)="stopWorkflow(workflow.id)"
                  class="btn btn-danger btn-sm">
                  Stop
                </button>
                <button 
                  *ngIf="workflow.status === 'STOPPED'"
                  (click)="startWorkflow(workflow.id)"
                  class="btn btn-success btn-sm">
                  Start
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class WorkflowListComponent implements OnInit {
  workflows: Workflow[] = [];

  constructor(private automationService: AutomationService) {}

  ngOnInit() {
    this.loadWorkflows();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600 font-semibold';
      case 'STOPPED':
        return 'text-red-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  }

  stopWorkflow(id: string) {
    this.automationService.updateWorkflowStatus(id, 'STOPPED')
      .subscribe({
        next: () => this.loadWorkflows(),
        error: (error) => console.error('Error stopping workflow:', error)
      });
  }

  startWorkflow(id: string) {
    this.automationService.updateWorkflowStatus(id, 'ACTIVE')
      .subscribe({
        next: () => this.loadWorkflows(),
        error: (error) => console.error('Error starting workflow:', error)
      });
  }

  private loadWorkflows() {
    this.automationService.getWorkflows().subscribe({
      next: (workflows) => this.workflows = workflows,
      error: (error) => console.error('Error loading workflows:', error)
    });
  }
}