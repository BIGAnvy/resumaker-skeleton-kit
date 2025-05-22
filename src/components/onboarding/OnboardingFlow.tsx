
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  allowSkip?: boolean;
};

type OnboardingFlowProps = {
  steps: OnboardingStep[];
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
};

const OnboardingFlow = ({ steps, isOpen, onComplete, onClose }: OnboardingFlowProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { toast } = useToast();

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep.id]);
    toast({
      title: "Onboarding complete!",
      description: "You're all set to start using Resumaker.",
    });
    onComplete();
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    handleNext();
  };

  const handleSkip = () => {
    if (currentStep.allowSkip) {
      handleNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex justify-between items-center px-6 pt-6">
            <div className="flex items-center space-x-2">
              <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {currentStepIndex + 1}
              </span>
              <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} of {steps.length}</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          <Progress value={progress} className="h-1 mt-6" />
  
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">{currentStep.title}</DialogTitle>
            <DialogDescription>{currentStep.description}</DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep.content}
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between w-full">
            <div>
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
            <div className="flex space-x-2">
              {currentStep.allowSkip && (
                <Button variant="outline" onClick={handleSkip}>
                  Skip this step
                </Button>
              )}
              {currentStep.action ? (
                <Button onClick={markStepComplete}>
                  {currentStep.action.label}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {isLastStep ? (
                    <>
                      Complete
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingFlow;
