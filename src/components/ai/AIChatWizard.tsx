import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, User, Sparkles, Upload, Link, Clock, AlertCircle, CheckCircle, PlusCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'error' | 'success';
  attachments?: { type: 'file' | 'link'; name: string; url?: string }[];
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const suggestions = [
    "I graduated from University of Technology with a Computer Science degree in 2020.",
    "I have 3 years experience as a Frontend Developer at TechCorp.",
    "My skills include JavaScript, React, and UI/UX design.",
    "I'm looking for a senior position in software development."
  ];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Add the initial question from the first step
    if (messages.length === 1) {
      simulateAIResponse(wizardSteps[0].question);
    }
    
    // Set progress based on current step
    setProgressValue(((currentStep + 1) / wizardSteps.length) * 100);
  }, [currentStep]);

  const simulateAIResponse = (content: string, delay = 500) => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content,
          timestamp: new Date(),
          status: 'success' as const
        }
      ]);
      setIsGenerating(false);
    }, delay);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      status: 'success' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setShowSuggestions(false);
    
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a message with file attachment (in a real app, this would upload the file)
    const fileMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `I'm attaching my ${file.name} for reference.`,
      timestamp: new Date(),
      attachments: [{ type: 'file', name: file.name }]
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsGenerating(true);

    // Simulate processing the file
    setTimeout(() => {
      simulateAIResponse(`Thanks for sharing ${file.name}. I've extracted relevant information from it and will use it to help build your resume.`);
    }, 1500);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const handleRetry = (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    // Get the message content
    const messageContent = messages[messageIndex].content;
    
    // Remove all messages after this one
    const newMessages = messages.slice(0, messageIndex);
    
    setMessages(newMessages);
    setInput(messageContent);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Resume AI Wizard</h1>
        <p className="text-muted-foreground mt-1">Answer a few questions and I'll help create your perfect resume</p>
      </div>
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="bg-muted py-2">
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Resume Assistant
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View chat history</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Help & tips</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium">You</span>
                      </div>
                      
                      {message.status === 'error' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <AlertCircle className="h-3 w-3 text-destructive" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRetry(message.id)}>
                              Retry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                  )}
                  
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.attachments?.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment, i) => (
                        <div key={i} className="flex items-center text-xs p-1 bg-background/50 rounded">
                          {attachment.type === 'file' ? (
                            <Upload className="h-3 w-3 mr-1" />
                          ) : (
                            <Link className="h-3 w-3 mr-1" />
                          )}
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 text-right mt-1 flex items-center justify-end">
                    {message.status === 'success' && message.role === 'assistant' && (
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                    )}
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
        
        {showSuggestions && (
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs font-medium mb-2">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleUseSuggestion(suggestion)}
                  className="text-xs"
                >
                  {suggestion.length > 30 ? `${suggestion.substring(0, 30)}...` : suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <CardFooter className="border-t p-4">
          <div className="w-full space-y-2">
            <form 
              className="flex w-full items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
              />
              <Button 
                type="button" 
                size="icon"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isGenerating}
                className="flex-shrink-0"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload file</span>
              </Button>
              
              <Textarea 
                placeholder="Type your message..."
                className="flex-1 min-h-10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                rows={1}
              />
              
              <Button 
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setShowSuggestions(!showSuggestions)}
                disabled={isGenerating}
                className="flex-shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Show suggestions</span>
              </Button>
              
              <Button 
                type="submit" 
                size="icon"
                disabled={isGenerating || !input.trim()}
                className="flex-shrink-0"
              >
                <SendHorizontal className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            
            <div className="w-full">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Step {currentStep + 1} of {wizardSteps.length} • {wizardSteps[currentStep]?.title}</span>
                <span>{Math.round(progressValue)}% Complete</span>
              </div>
              <Progress value={progressValue} className="h-1" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIChatWizard;
