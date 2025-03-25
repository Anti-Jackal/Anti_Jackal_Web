import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OneTimePaymentFormProps {
  customAmount: string;
  setCustomAmount: (value: string) => void;
}

const OneTimePaymentForm = ({ customAmount, setCustomAmount }: OneTimePaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-ajackal-white/90">Сумма пополнения (₽)</Label>
        <Input
          id="amount"
          type="number"
          min="1"
          placeholder="Введите сумму"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="bg-ajackal-black/50 border-ajackal-purple/30 focus:ring-ajackal-purple text-ajackal-white"
        />
      </div>
    </div>
  );
};

export default OneTimePaymentForm;