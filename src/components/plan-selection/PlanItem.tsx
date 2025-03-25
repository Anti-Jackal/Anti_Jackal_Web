import React from 'react';
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, PiggyBank } from 'lucide-react';
import { SubscriptionPlan } from './types';

interface PlanItemProps {
  plan: SubscriptionPlan;
  selectedPlan: string;
  onSelect: (planId: string) => void;
}

const PlanItem = ({ plan, selectedPlan, onSelect }: PlanItemProps) => {
  const baseId = plan.id.split('-')[0];
  const isSelected = selectedPlan === baseId;

  return (
    <div 
      className={`p-4 border ${isSelected ? 'border-ajackal-purple' : 'border-ajackal-purple/30'} rounded-md bg-ajackal-purple/10 cursor-pointer hover:bg-ajackal-purple/15 transition-all duration-200`}
      onClick={() => onSelect(baseId)}
    >
      <div className="flex items-start gap-4">
        <RadioGroupItem value={baseId} id={plan.id} className="mt-1" />
        <div className="flex-grow">
          <Label htmlFor={plan.id} className="font-medium text-lg mb-1 flex items-center gap-2">
            {plan.name}
            {plan.period === 'year' && (
              <span className="bg-ajackal-purple/20 text-ajackal-purple px-2 py-0.5 rounded-full text-xs font-bold">
                -15%
              </span>
            )}
          </Label>
          <div className="flex justify-between items-center mt-1">
            <div>
              <p className="text-ajackal-white/70 text-sm mb-1">
                {plan.price} ₽/{plan.period === 'month' ? 'месяц' : 'год'}
              </p>
              <div className="flex items-center gap-2 text-ajackal-white/90">
                <PiggyBank className="h-4 w-4 text-ajackal-purple" /> 
                <span className="text-sm">Получаете {plan.creditAmount} ₽</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {isSelected && (
                <Check className="h-5 w-5 text-ajackal-purple" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanItem;
