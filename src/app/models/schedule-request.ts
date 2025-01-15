export interface ScheduleRequest {
    cronExpression?: string;
    startAt?: string;
    endAt?: string;
    repeatCount?: number;
    intervalInSeconds?: number;
  }
  
  export interface Workflow {
    id: string;
    triggerType: string;
    triggerValue: string;
    actionType: string;
    status: string;
    cronExpression?: string;
    startAt?: string;
    endAt?: string;
    repeatCount?: number;
    intervalInSeconds?: number;
  }