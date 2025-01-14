export interface Campaign {
    id?: number;
    name: string;
    type: string;
    startDate: string; // Use `string` for date inputs
    endDate: string;
    status: string;
    content: string;
  }
  