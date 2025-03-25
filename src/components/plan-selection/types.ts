export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    creditAmount: number;
    period: 'month' | 'year';
  }