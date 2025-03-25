import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, CalendarClock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import OneTimePaymentForm from './plan-selection/OneTimePaymentForm';
import SubscriptionForm from './plan-selection/SubscriptionForm';
import { getActivePlans, getSelectedPlanDetails } from './plan-selection/planUtils';

interface TopUpBalanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number) => void;
}

const TopUpBalanceDialog = ({ isOpen, onClose, onSuccess }: TopUpBalanceDialogProps) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('onetime');
  const [activePeriod, setActivePeriod] = useState<'month' | 'year'>('month');
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine amount based on selected option
    let amount = 0;
    
    if (activeTab === 'onetime') {
      amount = parseFloat(customAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, введите корректную сумму",
          variant: "destructive"
        });
        return;
      }
    } else if (activeTab === 'subscription') {
      const plan = getSelectedPlanDetails(activePeriod, selectedPlan);
      if (plan) {
        amount = plan.creditAmount;
      }
    }
    
    // In a real app, this would handle the payment processing
    // For now, we'll just simulate a successful payment
    toast({
      title: "Успешно",
      description: `Баланс пополнен на ${amount} ₽`,
      variant: "default"
    });
    
    if (onSuccess) {
      onSuccess(amount);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-ajackal-black border border-ajackal-purple/30 text-ajackal-white w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ajackal-gradient-text">Пополнение баланса</DialogTitle>
          <DialogDescription className="text-ajackal-white/70">
            Выберите способ пополнения баланса вашего аккаунта
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="onetime" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 bg-ajackal-black/70 border border-ajackal-purple/20">
              <TabsTrigger value="onetime" className="data-[state=active]:bg-ajackal-purple/20 data-[state=active]:text-ajackal-white">
                <CreditCard className="mr-2 h-4 w-4" />
                Разовый платеж
              </TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-ajackal-purple/20 data-[state=active]:text-ajackal-white">
                <CalendarClock className="mr-2 h-4 w-4" />
                Подписка
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="onetime" className="mt-4">
              <OneTimePaymentForm 
                customAmount={customAmount}
                setCustomAmount={setCustomAmount}
              />
            </TabsContent>
            
            <TabsContent value="subscription" className="mt-4">
              <SubscriptionForm 
                activePeriod={activePeriod}
                setActivePeriod={setActivePeriod}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                plans={getActivePlans(activePeriod)}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button 
              type="submit"
              className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300"
            >
              Оплатить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpBalanceDialog;