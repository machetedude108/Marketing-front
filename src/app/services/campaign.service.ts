import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private apiUrl = 'http://localhost:8081/api/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/${id}`);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.apiUrl}/${id}`, campaign);
  }

  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendCampaign(id: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${id}/send`, {});
  }
}
