
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Users, FileText, Zap, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Resumaker</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Возможности</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Шаблоны</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Цены</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors">Отзывы</a>
            </nav>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="hidden md:flex"
            >
              Войти в приложение
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Создавайте резюме,<br />
            <span className="text-resumaker-600">которые работают</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Современный конструктор резюме с AI-помощником. Создавайте профессиональные резюме за минуты, 
            получайте больше собеседований и находите работу мечты.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-resumaker-600 hover:bg-resumaker-700 text-white px-8"
            >
              Создать резюме бесплатно
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Посмотреть примеры
            </Button>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>50,000+ пользователей</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400" />
              <span>4.9/5 рейтинг</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Все, что нужно для идеального резюме
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мощные инструменты и AI-технологии для создания резюме, которое выделит вас среди кандидатов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-resumaker-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">
            Нам доверяют профессионалы
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-resumaker-600 mb-2">85%</div>
              <p className="text-gray-600">получают отклик на резюме</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-resumaker-600 mb-2">3x</div>
              <p className="text-gray-600">больше собеседований</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-resumaker-600 mb-2">7 дней</div>
              <p className="text-gray-600">средний срок до оффера</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Что говорят наши пользователи
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Выберите подходящий план
            </h2>
            <p className="text-xl text-gray-600">
              Начните бесплатно, расширяйте возможности по мере роста потребностей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-sm ${plan.popular ? 'ring-2 ring-resumaker-600' : ''}`}>
                <CardContent className="p-6">
                  {plan.popular && (
                    <div className="bg-resumaker-600 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                      Популярный
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                    <div className="text-gray-500">{plan.period}</div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-resumaker-600 hover:bg-resumaker-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/dashboard')}
                  >
                    {plan.name === 'Free' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Готовы создать резюме мечты?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам профессионалов, которые уже нашли работу с помощью Resumaker
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/dashboard')}
            className="bg-resumaker-600 hover:bg-resumaker-700 text-white px-8"
          >
            Создать резюме прямо сейчас
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-gray-400 mt-4">Бесплатно. Без кредитной карты.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-gray-900">Resumaker</span>
              <p className="text-gray-600 mt-2">Создавайте резюме, которые работают</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Продукт</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Шаблоны</a></li>
                <li><a href="#" className="hover:text-gray-900">AI-помощник</a></li>
                <li><a href="#" className="hover:text-gray-900">Примеры</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Ресурсы</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Блог</a></li>
                <li><a href="#" className="hover:text-gray-900">Карьерные советы</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Контакты</a></li>
                <li><a href="#" className="hover:text-gray-900">Помощь</a></li>
                <li><a href="#" className="hover:text-gray-900">Политика</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 mt-8 text-center text-gray-600">
            <p>&copy; 2024 Resumaker. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
