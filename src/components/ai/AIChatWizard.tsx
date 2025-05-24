
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, User, Bot, Upload, Link, Clock, CheckCircle, PlusCircle, Play, FileText, Sparkles } from 'lucide-react';
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
      content: "🤖 Привет! Я ваш AI-ассистент для создания профессионального резюме.\n\nЯ создам для вас идеальное резюме, пошагово собирая информацию о вашем опыте, навыках и достижениях.\n\n✨ Что я могу делать:\n• Анализировать прикрепленные документы\n• Обрабатывать ссылки на портфолио\n• Оптимизировать под ATS-системы\n• Создавать персонализированный контент\n\nГотовы начать? Нажмите кнопку ниже! 🚀",
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
      question: "Давайте начнем с основ! Расскажите мне:\n\n👤 Ваше полное имя\n📧 Email и телефон\n🌍 Город проживания\n💼 Желаемая должность/направление",
      completed: false,
    },
    {
      id: 'summary',
      title: 'Профессиональное резюме',
      question: "Отлично! Теперь о вашей экспертизе:\n\n🎯 Ваша специализация\n⭐ Ключевые достижения\n🏆 Уникальные навыки\n📈 Что делает вас особенным?",
      completed: false,
    },
    {
      id: 'experience',
      title: 'Опыт работы',
      question: "Расскажите о своем профессиональном пути:\n\n🏢 Компании и должности\n📅 Даты работы\n🎯 Ключевые обязанности\n📊 Конкретные результаты и цифры",
      completed: false,
    },
    {
      id: 'education',
      title: 'Образование',
      question: "Поделитесь информацией об образовании:\n\n🎓 Учебные заведения\n📚 Специальность/направление\n📅 Годы обучения\n🏅 Сертификаты и курсы",
      completed: false,
    },
    {
      id: 'skills',
      title: 'Навыки и компетенции',
      question: "Последний штрих - ваши навыки:\n\n🛠️ Технические навыки\n💡 Soft skills\n🌐 Языки (уровень)\n⚡ Специальные инструменты",
      completed: false,
    },
    {
      id: 'complete',
      title: 'Генерация резюме',
      question: "🎉 Превосходно! У меня есть вся информация.\n\nТеперь я создам ваше профессиональное резюме, оптимизированное для современных требований рынка труда.\n\nГотовы к магии? ✨",
      completed: false,
    }
  ];

  const suggestions = [
    "Анна Петрова, frontend-разработчик из Москвы",
    "5 лет в разработке React приложений",
    "Ведущий разработчик в Яндексе 2020-2023",
    "Владею TypeScript, Node.js, знаю английский B2"
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
        simulateAIResponse("🎊 Ваше резюме готово!\n\nЯ создал профессиональное резюме, оптимизированное под современные стандарты. Резюме учитывает:\n\n✅ ATS-совместимость\n✅ Современный дизайн\n✅ Ключевые слова отрасли\n✅ Структуру достижений\n\nПереходите в редактор для финальной настройки!", 2000);
        
        toast({
          title: "🎉 Резюме создано!",
          description: "Ваше AI-резюме готово к просмотру и редактированию.",
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
      content: `📎 Прикрепил файл: ${file.name}`,
      timestamp: new Date(),
      attachments: [{ type: 'file', name: file.name }]
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsGenerating(true);

    setTimeout(() => {
      simulateAIResponse(`✅ Отлично! Анализирую файл "${file.name}"...\n\nИзвлек полезную информацию для резюме. Продолжим сбор данных!`);
    }, 1800);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="border-0 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
          <CardHeader className="border-b border-slate-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AI Resume Creator</h1>
                  <p className="text-sm text-slate-400">Создание резюме с искусственным интеллектом</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {wizardStarted && (
                  <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                    Шаг {currentStep + 1}/{wizardSteps.length}
                  </div>
                )}
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </div>
            {wizardStarted && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>{wizardSteps[currentStep]?.title}</span>
                  <span>{Math.round(progressValue)}%</span>
                </div>
                <Progress value={progressValue} className="h-1 bg-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progressValue}%` }}
                  />
                </Progress>
              </div>
            )}
          </CardHeader>
          
          <ScrollArea className="h-96 p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-sm
                      ${message.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white ml-4' 
                        : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 mr-4'
                      }
                    `}
                  >
                    <div className="flex items-center mb-2">
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 mr-2" />
                      ) : (
                        <Bot className="h-4 w-4 mr-2 text-purple-400" />
                      )}
                      <span className="text-xs font-medium opacity-80">
                        {message.role === 'user' ? 'Вы' : 'AI Assistant'}
                      </span>
                    </div>
                    
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {message.attachments?.length > 0 && (
                      <div className="mt-3 p-2 rounded-lg bg-black/20 border border-slate-600/30">
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
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleStartWizard}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-3" />
                    Начать создание резюме
                    <Sparkles className="h-5 w-5 ml-3" />
                  </Button>
                </div>
              )}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-slate-800/80 border border-slate-700/50 mr-4">
                    <div className="flex items-center gap-1">
                      <Bot className="h-4 w-4 mr-2 text-purple-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
          
          {showSuggestions && wizardStarted && (
            <div className="px-6 py-3 border-t border-slate-700/50 bg-slate-800/30">
              <p className="text-xs font-medium text-slate-400 mb-3">💡 Примеры ответов:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="text-xs bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                  >
                    {suggestion.length > 40 ? `${suggestion.substring(0, 40)}...` : suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {wizardStarted && (
            <CardFooter className="border-t border-slate-700/50 bg-slate-800/20 p-6">
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
                        className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 text-slate-300"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Прикрепить файл</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="flex-1 relative">
                  <Textarea 
                    placeholder="Введите ваш ответ..."
                    className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
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
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800"
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
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
