import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSchedulerComponent } from './campaign-scheduler.component';

describe('CampaignSchedulerComponent', () => {
  let component: CampaignSchedulerComponent;
  let fixture: ComponentFixture<CampaignSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignSchedulerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
