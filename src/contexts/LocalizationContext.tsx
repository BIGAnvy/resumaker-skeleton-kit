
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'fr' | 'de' | 'es' | 'zh' | 'ja';

type Translations = {
  [key: string]: {
    [lang in Language]: string;
  };
};

type LocalizationContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Translations = {
  // Header
  'header.examples': {
    ru: 'Посмотреть примеры',
    en: 'View Examples',
    fr: 'Voir les exemples',
    de: 'Beispiele ansehen',
    es: 'Ver ejemplos',
    zh: '查看示例',
    ja: '例を見る'
  },
  'header.login': {
    ru: 'Войти в приложение',
    en: 'Login to App',
    fr: 'Se connecter',
    de: 'App öffnen',
    es: 'Iniciar sesión',
    zh: '登录应用',
    ja: 'アプリにログイン'
  },
  // Hero section
  'hero.title': {
    ru: 'Создайте идеальное резюме с помощью ИИ',
    en: 'Create the Perfect Resume with AI',
    fr: 'Créez le CV parfait avec l\'IA',
    de: 'Erstellen Sie den perfekten Lebenslauf mit KI',
    es: 'Crea el currículum perfecto con IA',
    zh: '用人工智能创建完美简历',
    ja: 'AIで完璧な履歴書を作成'
  },
  'hero.subtitle': {
    ru: 'Революционный конструктор резюме, который поможет вам выделиться среди конкурентов и получить работу мечты',
    en: 'Revolutionary resume builder that helps you stand out from competitors and get your dream job',
    fr: 'Constructeur de CV révolutionnaire qui vous aide à vous démarquer de la concurrence et à obtenir l\'emploi de vos rêves',
    de: 'Revolutionärer Lebenslauf-Builder, der Ihnen hilft, sich von der Konkurrenz abzuheben und Ihren Traumjob zu bekommen',
    es: 'Constructor de currículum revolucionario que te ayuda a destacar entre la competencia y conseguir el trabajo de tus sueños',
    zh: '革命性的简历构建器，帮助您在竞争中脱颖而出，获得理想工作',
    ja: '競合他社から際立ち、夢の仕事を手に入れるのに役立つ革新的な履歴書ビルダー'
  },
  'hero.cta': {
    ru: 'Начать создание резюме',
    en: 'Start Building Resume',
    fr: 'Commencer à créer un CV',
    de: 'Lebenslauf erstellen',
    es: 'Empezar a crear currículum',
    zh: '开始创建简历',
    ja: '履歴書作成を開始'
  },
  'hero.freeTrial': {
    ru: 'Бесплатно • Без регистрации',
    en: 'Free • No Registration',
    fr: 'Gratuit • Sans inscription',
    de: 'Kostenlos • Ohne Registrierung',
    es: 'Gratis • Sin registro',
    zh: '免费 • 无需注册',
    ja: '無料 • 登録不要'
  },
  // Features
  'features.title': {
    ru: 'Почему выбирают Resumaker?',
    en: 'Why Choose Resumaker?',
    fr: 'Pourquoi choisir Resumaker?',
    de: 'Warum Resumaker wählen?',
    es: '¿Por qué elegir Resumaker?',
    zh: '为什么选择 Resumaker？',
    ja: 'なぜResumakerを選ぶのか？'
  },
  'features.ai.title': {
    ru: 'Искусственный интеллект',
    en: 'Artificial Intelligence',
    fr: 'Intelligence artificielle',
    de: 'Künstliche Intelligenz',
    es: 'Inteligencia artificial',
    zh: '人工智能',
    ja: '人工知能'
  },
  'features.ai.description': {
    ru: 'ИИ анализирует ваш опыт и предлагает улучшения',
    en: 'AI analyzes your experience and suggests improvements',
    fr: 'L\'IA analyse votre expérience et suggère des améliorations',
    de: 'KI analysiert Ihre Erfahrung und schlägt Verbesserungen vor',
    es: 'La IA analiza tu experiencia y sugiere mejoras',
    zh: 'AI分析您的经验并提出改进建议',
    ja: 'AIがあなたの経験を分析し、改善を提案します'
  },
  'features.templates.title': {
    ru: 'Профессиональные шаблоны',
    en: 'Professional Templates',
    fr: 'Modèles professionnels',
    de: 'Professionelle Vorlagen',
    es: 'Plantillas profesionales',
    zh: '专业模板',
    ja: 'プロフェッショナルテンプレート'
  },
  'features.templates.description': {
    ru: 'Более 50 современных шаблонов для любой сферы',
    en: 'Over 50 modern templates for any industry',
    fr: 'Plus de 50 modèles modernes pour tous les secteurs',
    de: 'Über 50 moderne Vorlagen für jede Branche',
    es: 'Más de 50 plantillas modernas para cualquier industria',
    zh: '超过50个适用于任何行业的现代模板',
    ja: 'あらゆる業界に対応した50以上のモダンテンプレート'
  },
  'features.export.title': {
    ru: 'Экспорт в разных форматах',
    en: 'Multiple Export Formats',
    fr: 'Plusieurs formats d\'exportation',
    de: 'Mehrere Exportformate',
    es: 'Múltiples formatos de exportación',
    zh: '多种导出格式',
    ja: '複数のエクスポート形式'
  },
  'features.export.description': {
    ru: 'PDF, Word, или поделитесь ссылкой онлайн',
    en: 'PDF, Word, or share link online',
    fr: 'PDF, Word, ou partager un lien en ligne',
    de: 'PDF, Word oder Link online teilen',
    es: 'PDF, Word, o compartir enlace en línea',
    zh: 'PDF、Word或在线分享链接',
    ja: 'PDF、Word、またはオンラインでリンクを共有'
  }
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ru');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('resumaker-language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('resumaker-language') as Language;
    if (savedLanguage && Object.keys(translations['hero.title']).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LocalizationContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
