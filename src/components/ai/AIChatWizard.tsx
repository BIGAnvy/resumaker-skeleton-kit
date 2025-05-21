
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, User, Sparkles } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

type WizardStep = {
  id: string;
  title: string;
  question: string;
  completed: boolean;
};

const AIChatWizard = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: "Welcome to the Resume AI Wizard! I'll help you create a professional resume by asking you some questions about your experience. Let's get started!",
      timestamp: new Date(),
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const wizardSteps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      question: "Let's start with your basic information. What's your name, contact details, and location?",
      completed: false,
    },
    {
      id: 'summary',
      title: 'Professional Summary',
      question: "Great! Now, tell me a bit about yourself professionally. What's your career focus and what are you looking for?",
      completed: false,
    },
    {
      id: 'experience',
      title: 'Work Experience',
      question: "Now let's talk about your work experience. Please share your job history, starting with your most recent position.",
      completed: false,
    },
    {
      id: 'education',
      title: 'Education',
      question: "What's your educational background? Include degrees, institutions, and graduation years.",
      completed: false,
    },
    {
      id: 'skills',
      title: 'Skills',
      question: "What are your key professional skills? Include technical skills, soft skills, and any certifications.",
      completed: false,
    },
    {
      id: 'complete',
      title: 'Generate Resume',
      question: "Thanks for providing all the information! Would you like me to generate your resume now?",
      completed: false,
    }
  ];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Add the initial question from the first step
    if (messages.length === 1) {
      simulateAIResponse(wizardSteps[0].question);
    }
  }, []);

  const simulateAIResponse = (content: string, delay = 500) => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content,
          timestamp: new Date()
        }
      ]);
      setIsGenerating(false);
    }, delay);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    
    // Process the next step
    const nextStep = currentStep + 1;
    
    if (nextStep < wizardSteps.length) {
      // Move to next question
      setTimeout(() => {
        simulateAIResponse(wizardSteps[nextStep].question);
        setCurrentStep(nextStep);
      }, 1000);
    } else {
      // Finish the wizard and generate resume
      setTimeout(() => {
        simulateAIResponse("I've generated a resume based on your information! You can now review and edit it in the Resume Builder.", 1500);
        
        toast({
          title: "Resume generated!",
          description: "Your AI-generated resume is ready to view and edit.",
        });
        
        // In a real app, this would navigate to the resume builder with generated content
        setCurrentStep(0);
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Resume AI Wizard</h1>
        <p className="text-muted-foreground mt-1">Answer a few questions and I'll help create your perfect resume</p>
      </div>
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="bg-muted py-2">
          <CardTitle className="text-base flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            Resume Assistant
          </CardTitle>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[80%] rounded-lg px-4 py-2 
                    ${message.role === 'user' ? 'bg-primary text-primary-foreground' : message.role === 'system' ? 'bg-muted' : 'bg-muted border'}
                  `}
                >
                  {message.role === 'user' && (
                    <div className="flex items-center mb-1">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">You</span>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                  )}
                  
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  <div className="text-xs opacity-70 text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted border">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 bg-current rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>
        </ScrollArea>
        
        <CardFooter className="border-t p-4">
          <form 
            className="flex w-full items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Textarea 
              placeholder="Type your message..."
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              rows={1}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isGenerating || !input.trim()}
            >
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {wizardSteps.length} • {wizardSteps[currentStep]?.title}
        </p>
        <div className="w-full bg-muted h-1.5 mt-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep + 1) / wizardSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AIChatWizard;
