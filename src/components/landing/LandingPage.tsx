
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Users, FileText, Zap, Shield, Globe, Sparkles, Brain, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-powered Generation",
      description: "Создавайте резюме за минуты с помощью искусственного интеллекта"
    },
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Более 50 современных шаблонов для любой индустрии"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Поддержка множества языков и локализация"
    },
    {
      icon: Shield,
      title: "ATS Optimized",
      description: "Резюме оптимизированы для систем автоматического отбора"
    }
  ];

  const testimonials = [
    {
      name: "Анна Смирнова",
      role: "Frontend Developer",
      text: "Получила работу мечты через 2 недели после создания резюме в Resumaker",
      rating: 5
    },
    {
      name: "Михаил Петров",
      role: "Product Manager", 
      text: "Простой интерфейс и профессиональные шаблоны - именно то, что нужно",
      rating: 5
    },
    {
      name: "Елена Козлова",
      role: "UX Designer",
      text: "AI-помощник помог структурировать опыт и выделить ключевые достижения",
      rating: 5
    }
  ];

  const pricing = [
    {
      name: "Free",
      price: "0₽",
      period: "навсегда",
      features: [
        "3 резюме",
        "Базовые шаблоны",
        "Экспорт в PDF",
        "Базовая поддержка AI"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "990₽",
      period: "в месяц",
      features: [
        "Безлимитные резюме",
        "Все премиум шаблоны",
        "Продвинутый AI",
        "Приоритетная поддержка",
        "Аналитика откликов"
      ],
      popular: true
    },
    {
      name: "Team",
      price: "2990₽", 
      period: "в месяц",
      features: [
        "Все из Pro",
        "Командная работа",
        "Брендинг компании",
        "API доступ",
        "Персональный менеджер"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-resumaker-600 opacity-20 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-resumaker-500 to-resumaker-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Resumaker
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">Возможности</a>
              <a href="#templates" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">Шаблоны</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">Цены</a>
              <a href="#reviews" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">Отзывы</a>
            </nav>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="hidden md:flex border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Войти в приложение
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-resumaker-400 mr-2" />
            <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Создавайте резюме,
            </span>
            <br />
            <span className="bg-gradient-to-r from-resumaker-400 via-resumaker-500 to-resumaker-600 bg-clip-text text-transparent">
              которые работают
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Революционный AI-конструктор резюме. Создавайте профессиональные резюме за минуты, 
            получайте больше собеседований и находите работу мечты.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-resumaker-500 to-resumaker-700 hover:from-resumaker-600 hover:to-resumaker-800 text-white px-8 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(6,112,226,0.3)] hover:shadow-[0_0_40px_rgba(6,112,226,0.5)] transition-all duration-300"
            >
              Создать резюме бесплатно
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              Посмотреть примеры
            </Button>
          </div>
          
          <div className="flex justify-center items-center space-x-12 text-gray-500">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5" />
              <span className="text-lg">50,000+ пользователей</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg">4.9/5 рейтинг</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Target className="w-4 h-4 text-resumaker-400 mr-2" />
              <span className="text-sm text-gray-300">Мощные возможности</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Все, что нужно для<br />идеального резюме
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Передовые AI-технологии и инструменты для создания резюме, которое выделит вас среди тысяч кандидатов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-resumaker-500/50 transition-all duration-500 hover:translate-y-[-4px]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-resumaker-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-resumaker-500 to-resumaker-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Нам доверяют<br />профессионалы
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div className="text-6xl font-bold bg-gradient-to-r from-resumaker-400 to-resumaker-600 bg-clip-text text-transparent mb-4">85%</div>
              <p className="text-gray-400 text-lg">получают отклик на резюме</p>
            </div>
            <div className="p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div className="text-6xl font-bold bg-gradient-to-r from-resumaker-400 to-resumaker-600 bg-clip-text text-transparent mb-4">3x</div>
              <p className="text-gray-400 text-lg">больше собеседований</p>
            </div>
            <div className="p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div className="text-6xl font-bold bg-gradient-to-r from-resumaker-400 to-resumaker-600 bg-clip-text text-transparent mb-4">7 дней</div>
              <p className="text-gray-400 text-lg">средний срок до оффера</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Что говорят наши<br />пользователи
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-resumaker-500/50 transition-all duration-500"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white text-lg">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Выберите<br />подходящий план
            </h2>
            <p className="text-xl text-gray-400">
              Начните бесплатно, расширяйте возможности по мере роста потребностей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div 
                key={index} 
                className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:translate-y-[-4px] ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-resumaker-500/20 to-resumaker-700/20 border-2 border-resumaker-500' 
                    : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-resumaker-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-resumaker-500 to-resumaker-700 text-white text-sm font-bold px-6 py-2 rounded-full">
                      Популярный
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">{plan.price}</div>
                  <div className="text-gray-400">{plan.period}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-resumaker-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-resumaker-500 to-resumaker-700 hover:from-resumaker-600 hover:to-resumaker-800 text-white shadow-[0_0_30px_rgba(6,112,226,0.3)]' 
                      : 'border-white/20 text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/dashboard')}
                >
                  {plan.name === 'Free' ? 'Начать бесплатно' : 'Выбрать план'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-16 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Готовы создать<br />резюме мечты?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Присоединяйтесь к тысячам профессионалов, которые уже нашли работу с помощью Resumaker
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-resumaker-500 to-resumaker-700 hover:from-resumaker-600 hover:to-resumaker-800 text-white px-12 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(6,112,226,0.3)] hover:shadow-[0_0_40px_rgba(6,112,226,0.5)] transition-all duration-300"
            >
              Создать резюме прямо сейчас
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-gray-500 mt-6">Бесплатно. Без кредитной карты.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-resumaker-500 to-resumaker-700 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Resumaker
                </span>
              </div>
              <p className="text-gray-400">Создавайте резюме, которые работают</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Продукт</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Шаблоны</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI-помощник</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Примеры</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Ресурсы</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьерные советы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Поддержка</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 mt-12 text-center text-gray-500">
            <p>&copy; 2024 Resumaker. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
