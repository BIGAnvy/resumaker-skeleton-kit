
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, User, Bot, Upload, PlusCircle, Play, FileText, Sparkles, Brain } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

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
      role: 'assistant',
      content: "Привет! Я AI-ассистент для создания резюме.\n\nЯ помогу создать профессиональное резюме, которое выделит ваши сильные стороны и соответствует современным стандартам.\n\nМожу анализировать документы, оптимизировать под ATS-системы и создавать персонализированный контент.\n\nГотовы начать?",
      timestamp: new Date(),
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [wizardStarted, setWizardStarted] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const wizardSteps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Личная информация',
      question: "Расскажите о себе:\n\n• Полное имя\n• Контактная информация\n• Город проживания\n• Желаемая должность",
      completed: false,
    },
    {
      id: 'summary',
      title: 'Профессиональное резюме',
      question: "Опишите вашу экспертизу:\n\n• Специализация\n• Ключевые достижения\n• Уникальные навыки\n• Профессиональные цели",
      completed: false,
    },
    {
      id: 'experience',
      title: 'Опыт работы',
      question: "Расскажите о работе:\n\n• Компании и должности\n• Периоды работы\n• Основные обязанности\n• Достижения с цифрами",
      completed: false,
    },
    {
      id: 'education',
      title: 'Образование',
      question: "Образование и сертификаты:\n\n• Учебные заведения\n• Специальность\n• Годы обучения\n• Дополнительные курсы",
      completed: false,
    },
    {
      id: 'skills',
      title: 'Навыки',
      question: "Ваши компетенции:\n\n• Технические навыки\n• Личные качества\n• Языки\n• Инструменты и технологии",
      completed: false,
    },
    {
      id: 'complete',
      title: 'Финализация',
      question: "Отлично! Создаю ваше резюме.\n\nАнализирую информацию и оптимизирую под современные требования.\n\nГотово к генерации?",
      completed: false,
    }
  ];

  const suggestions = [
    "Анна Петрова, frontend-разработчик",
    "5 лет опыта в React",
    "Увеличил конверсию на 25%",
    "Владею английским B2"
  ];

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (wizardStarted && currentStep >= 0) {
      setProgressValue(((currentStep + 1) / wizardSteps.length) * 100);
    }
  }, [currentStep, wizardStarted]);

  const simulateAIResponse = (content: string, delay = 1000) => {
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
      
      simulateAIResponse(wizardSteps[0].question, 1500);
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
      }, 1200);
    } else {
      setTimeout(() => {
        simulateAIResponse("✨ Резюме готово!\n\nСоздано профессиональное резюме с учетом:\n• ATS-оптимизации\n• Современного дизайна\n• Ключевых слов отрасли\n• Структуры достижений\n\nПереходите к просмотру!");
        
        toast({
          title: "Резюме создано",
          description: "Ваше AI-резюме готово к просмотру.",
        });
        
        setTimeout(() => {
          setWizardStarted(false);
          setCurrentStep(-1);
          setProgressValue(0);
        }, 4000);
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
      content: `📎 ${file.name}`,
      timestamp: new Date(),
      attachments: [{ type: 'file', name: file.name }]
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsGenerating(true);

    setTimeout(() => {
      simulateAIResponse(`Файл "${file.name}" обработан.\n\nИзвлечена полезная информация для резюме.`);
    }, 1800);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-none bg-transparent">
          {/* Header */}
          <CardHeader className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">AI Resume Creator</h1>
                  <p className="text-sm text-gray-500">Создание резюме с искусственным интеллектом</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {wizardStarted && (
                  <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                    {currentStep + 1}/{wizardSteps.length}
                  </div>
                )}
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            {wizardStarted && (
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{wizardSteps[currentStep]?.title}</span>
                  <span>{Math.round(progressValue)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div 
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>
            )}
          </CardHeader>
          
          {/* Messages */}
          <ScrollArea className="h-[500px] p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[75%] rounded-2xl px-4 py-3
                      ${message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-50 text-gray-900 border border-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === 'user' ? (
                        <User className="h-3 w-3 mr-2 opacity-70" />
                      ) : (
                        <Bot className="h-3 w-3 mr-2 text-blue-500" />
                      )}
                      <span className="text-xs font-medium opacity-70">
                        {message.role === 'user' ? 'Вы' : 'AI'}
                      </span>
                    </div>
                    
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {message.attachments?.length > 0 && (
                      <div className="mt-2 p-2 rounded-lg bg-white/10">
                        {message.attachments.map((attachment, i) => (
                          <div key={i} className="flex items-center text-xs">
                            <FileText className="h-3 w-3 mr-2" />
                            <span>{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-50 text-right mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {!wizardStarted && (
                <div className="flex justify-center mt-12">
                  <Button 
                    onClick={handleStartWizard}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Начать создание резюме
                    <Sparkles className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Bot className="h-3 w-3 text-blue-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
          
          {/* Suggestions */}
          {showSuggestions && wizardStarted && (
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs font-medium text-gray-500 mb-3">Примеры ответов:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="text-xs bg-white border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          {wizardStarted && (
            <CardFooter className="border-t border-gray-100 bg-white p-6">
              <form 
                className="flex w-full items-end space-x-3"
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
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        size="icon"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isGenerating}
                        className="border-gray-200 hover:bg-gray-50 rounded-xl"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Прикрепить файл</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="flex-1 relative">
                  <Textarea 
                    placeholder="Ваш ответ..."
                    className="border-gray-200 focus:border-blue-300 focus:ring-blue-200 resize-none rounded-xl bg-gray-50 focus:bg-white transition-colors"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isGenerating}
                    rows={1}
                  />
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        disabled={isGenerating}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Показать примеры</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isGenerating || !input.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AIChatWizard;
