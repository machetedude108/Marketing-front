import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleRequest, Workflow } from '../models/schedule-request';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  private baseUrl = 'http://localhost:8085/api/v1/automation';

  constructor(private http: HttpClient) { }

  triggerCampaign(campaignId: number, scheduleRequest: ScheduleRequest): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/triggerCampaign?campaignId=${campaignId}`,
      scheduleRequest
    );
  }

  updateWorkflowStatus(workflowId: string, status: string): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/${workflowId}/status?status=${status}`,
      {}
    );
  }
  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${this.baseUrl}/workflows`);
  }
}