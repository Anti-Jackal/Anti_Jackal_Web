import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup } from "@/components/ui/radio-group";
import { CalendarClock, CalendarDays } from 'lucide-react';
import PlanItem from './PlanItem';
import { SubscriptionPlan } from './types';

interface SubscriptionFormProps {
  activePeriod: 'month' | 'year';
  setActivePeriod: (period: 'month' | 'year') => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  plans: SubscriptionPlan[];
}

const SubscriptionForm = ({ 
  activePeriod, 
  setActivePeriod, 
  selectedPlan, 
  setSelectedPlan,
  plans 
}: SubscriptionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center p-2 bg-ajackal-black/70 rounded-md border border-ajackal-purple/20 mb-4">
        <div className="grid grid-cols-2 w-full max-w-xs">
          <Button
            type="button"
            variant={activePeriod === 'month' ? 'default' : 'outline'}
            onClick={() => setActivePeriod('month')}
            className={`rounded-r-none ${activePeriod === 'month' ? 'bg-ajackal-purple' : 'border-ajackal-purple/30 text-ajackal-white'}`}
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            Месячная
          </Button>
          <Button
            type="button"
            variant={activePeriod === 'year' ? 'default' : 'outline'}
            onClick={() => setActivePeriod('year')}
            className={`rounded-l-none ${activePeriod === 'year' ? 'bg-ajackal-purple' : 'border-ajackal-purple/30 text-ajackal-white'}`}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Годовая
          </Button>
        </div>
      </div>

      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-3">
        {plans.map((plan) => (
          <PlanItem 
            key={plan.id}
            plan={plan}
            selectedPlan={selectedPlan}
            onSelect={setSelectedPlan}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubscriptionForm;