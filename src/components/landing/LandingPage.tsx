
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, FileText, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalization } from '@/contexts/LocalizationContext';
import LanguageSwitcher from '@/components/ui/language-switcher';

const LandingPage = () => {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 via-pink-800 to-orange-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-emerald-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>
      </div>

      {/* Interactive Geometric Pattern */}
      <div className="absolute inset-0 opacity-40">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 animate-pulse" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'float 25s ease-in-out infinite'
          }}
        ></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-cyan-400/40 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-yellow-400/50 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border-2 border-emerald-400/30 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-pink-400/40 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-36 h-36 border-2 border-purple-400/30 rotate-45 animate-pulse"></div>
        
        {/* Hexagonal Patterns */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 border-2 border-blue-400/50 animate-spin" style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            animationDuration: '18s'
          }}></div>
        </div>
        
        {/* Triangle Patterns */}
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <div className="w-20 h-20 border-2 border-green-400/40 animate-bounce" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animationDuration: '12s'
          }}></div>
        </div>
        
        {/* Additional Geometric Elements */}
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-indigo-400/50 rotate-45 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 border border-rose-400/40 rounded-full animate-spin" style={{ animationDuration: '22s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute top-2/5 right-1/5 w-3 h-3 bg-cyan-400/70 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 right-2/5 w-2 h-2 bg-pink-400/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Large Gradient Orbs */}
        <div className="absolute top-1/4 right-1/6 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Resumaker</span>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            className="text-gray-900 bg-white/90 hover:bg-white hover:text-gray-900 border-white/20 font-medium"
            asChild
          >
            <Link to="/templates">{t('header.examples')}</Link>
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-0"
            asChild
          >
            <Link to="/dashboard">{t('header.login')}</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl"
              asChild
            >
              <Link to="/ai-resume">
                <Sparkles className="mr-2 h-5 w-5" />
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-white/60 text-sm">{t('hero.freeTrial')}</p>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Bot className="h-16 w-16 mx-auto mb-6 text-purple-400" />
                <h3 className="text-2xl font-bold mb-4">{t('features.ai.title')}</h3>
                <p className="text-white/80 leading-relaxed">
                  {t('features.ai.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 mx-auto mb-6 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-4">{t('features.templates.title')}</h3>
                <p className="text-white/80 leading-relaxed">
                  {t('features.templates.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Download className="h-16 w-16 mx-auto mb-6 text-pink-400" />
                <h3 className="text-2xl font-bold mb-4">{t('features.export.title')}</h3>
                <p className="text-white/80 leading-relaxed">
                  {t('features.export.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
