import { SubscriptionPlan } from './types';

export const monthlyPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Базовая',
    price: 500,
    creditAmount: 600,
    period: 'month'
  },
  {
    id: 'standard',
    name: 'Стандартная',
    price: 1000,
    creditAmount: 1300,
    period: 'month'
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 2000,
    creditAmount: 2800,
    period: 'month'
  }
];

export const yearlyPlans: SubscriptionPlan[] = monthlyPlans.map(plan => ({
  ...plan,
  id: `${plan.id}-yearly`,
  price: Math.round(plan.price * 12 * 0.85), // 15% discount
  creditAmount: Math.round(plan.creditAmount * 12 * 0.85), // 15% discount applied to credits as well
  period: 'year'
})) as SubscriptionPlan[];

export const getActivePlans = (activePeriod: 'month' | 'year'): SubscriptionPlan[] => {
  return activePeriod === 'month' ? monthlyPlans : yearlyPlans;
};

export const getSelectedPlanDetails = (activePeriod: 'month' | 'year', selectedPlan: string): SubscriptionPlan | undefined => {
  const plans = getActivePlans(activePeriod);
  return plans.find(p => p.id.split('-')[0] === selectedPlan);
};
