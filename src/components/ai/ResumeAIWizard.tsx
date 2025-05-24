
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, User, Sparkles, Upload, Link, Clock, AlertCircle, CheckCircle, PlusCircle, Info, Play } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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

const ResumeAIWizard = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Привет! 👋 Я ваш AI-помощник для создания резюме с нуля.\n\nЯ помогу вам создать профессиональное резюме, задавая несколько вопросов о вашем опыте, образовании и навыках.\n\n📎 Вы можете прикреплять:\n• Файлы (PDF, DOC, DOCX)\n• Ссылки на портфолио или LinkedIn\n• Любые документы и материалы\n\nКогда будете готовы начать, нажмите кнопку \"Начать создание резюме\" ниже, и мы приступим к пошаговому процессу создания вашего идеального резюме!",
      timestamp: new Date(),
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1); // -1 означает еще не начали
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [wizardStarted, setWizardStarted] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const wizardSteps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Личная информация',
      question: "Давайте начнем с основной информации. Расскажите мне:\n• Ваше полное имя\n• Контактные данные (телефон, email)\n• Город проживания\n• Желаемая должность",
      completed: false,
    },
    {
      id: 'summary',
      title: 'Профессиональное резюме',
      question: "Теперь расскажите о себе как о профессионале:\n• Какой у вас опыт работы?\n• В какой сфере вы специализируетесь?\n• Какие ваши главные достижения?\n• Какую позицию ищете?",
      completed: false,
    },
    {
      id: 'experience',
      title: 'Опыт работы',
      question: "Подробно расскажите о вашем опыте работы:\n• Последние места работы (название компании, должность)\n• Период работы\n• Основные обязанности и достижения\n• Результаты работы (цифры, проекты)",
      completed: false,
    },
    {
      id: 'education',
      title: 'Образование',
      question: "Расскажите об образовании:\n• Учебные заведения\n• Специальность и квалификация\n• Годы обучения\n• Дополнительные курсы и сертификаты",
      completed: false,
    },
    {
      id: 'skills',
      title: 'Навыки',
      question: "Какими навыками вы обладаете:\n• Профессиональные навыки\n• Технические навыки\n• Языки (уровень владения)\n• Программы и инструменты",
      completed: false,
    },
    {
      id: 'complete',
      title: 'Генерация резюме',
      question: "Отлично! У меня есть вся необходимая информация. Готов создать ваше профессиональное резюме. Хотите, чтобы я сгенерировал его сейчас?",
      completed: false,
    }
  ];

  const suggestions = [
    "Меня зовут Анна Петрова, живу в Москве, ищу работу Frontend Developer",
    "Работал 3 года в IT-компании разработчиком на React",
    "Закончил МГУ по специальности Информатика в 2020 году",
    "Владею JavaScript, React, TypeScript, знаю английский на уровне B2"
  ];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (wizardStarted && currentStep >= 0) {
      setProgressValue(((currentStep + 1) / wizardSteps.length) * 100);
    }
  }, [currentStep, wizardStarted]);

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

  const handleStartWizard = () => {
    if (!wizardStarted) {
      setWizardStarted(true);
      setCurrentStep(0);
      setIsGenerating(true);
      
      simulateAIResponse(wizardSteps[0].question, 1000);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
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
    
    const nextStep = currentStep + 1;
    
    if (nextStep < wizardSteps.length) {
      setTimeout(() => {
        simulateAIResponse(wizardSteps[nextStep].question);
        setCurrentStep(nextStep);
      }, 1000);
    } else {
      setTimeout(() => {
        simulateAIResponse("🎉 Превосходно! Я создал ваше резюме на основе предоставленной информации.\n\nВаше резюме готово к просмотру и редактированию в основном редакторе. Вы можете переключиться на вкладку 'Editor' чтобы внести финальные правки или сразу экспортировать готовое резюме.\n\n✨ Резюме создано с учетом современных стандартов и оптимизировано для ATS-систем!", 1500);
        
        toast({
          title: "Резюме создано!",
          description: "Ваше AI-резюме готово к просмотру и редактированию.",
        });
        
        // Сбросить состояние для возможности начать заново
        setTimeout(() => {
          setWizardStarted(false);
          setCurrentStep(-1);
          setProgressValue(0);
        }, 3000);
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

    const fileMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Прикрепляю файл ${file.name} для дополнительной информации.`,
      timestamp: new Date(),
      attachments: [{ type: 'file', name: file.name }]
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsGenerating(true);

    setTimeout(() => {
      simulateAIResponse(`Спасибо за файл ${file.name}! Я извлек полезную информацию и учту её при создании резюме. Продолжим заполнение.`);
    }, 1500);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="bg-muted py-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              AI Создание резюме
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Справка и советы</TooltipContent>
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
                    max-w-[85%] rounded-lg px-4 py-3
                    ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border'}
                  `}
                >
                  {message.role === 'user' && (
                    <div className="flex items-center mb-1">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">Вы</span>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">AI Помощник</span>
                    </div>
                  )}
                  
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  
                  {message.attachments?.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((attachment, i) => (
                        <div key={i} className="flex items-center text-xs p-2 bg-background/50 rounded">
                          <Upload className="h-3 w-3 mr-1" />
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 text-right mt-2 flex items-center justify-end">
                    {message.status === 'success' && message.role === 'assistant' && (
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                    )}
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Кнопка "Начать создание резюме" */}
            {!wizardStarted && messages.length === 1 && (
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={handleStartWizard}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Начать создание резюме
                </Button>
              </div>
            )}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg px-4 py-3 bg-muted border">
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
        
        {showSuggestions && wizardStarted && (
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs font-medium mb-2">Примеры ответов:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleUseSuggestion(suggestion)}
                  className="text-xs"
                >
                  {suggestion.length > 40 ? `${suggestion.substring(0, 40)}...` : suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <CardFooter className="border-t p-4">
          <div className="w-full space-y-3">
            {wizardStarted && (
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
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
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
                  <span className="sr-only">Прикрепить файл</span>
                </Button>
                
                <Textarea 
                  placeholder="Введите ваш ответ..."
                  className="flex-1 min-h-12"
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
                  <span className="sr-only">Показать примеры</span>
                </Button>
                
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isGenerating || !input.trim()}
                  className="flex-shrink-0"
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="sr-only">Отправить</span>
                </Button>
              </form>
            )}
            
            {wizardStarted && (
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Шаг {currentStep + 1} из {wizardSteps.length} • {wizardSteps[currentStep]?.title}</span>
                  <span>{Math.round(progressValue)}% завершено</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResumeAIWizard;
