import { createContext, type ComponentChildren } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, ...args: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ComponentChildren;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, _setLocale] = useState('es'); // Idioma por defecto
  const [messages, setMessages] = useState<Record<string, string>>({});

  // Se ejecuta una vez al montar para establecer el idioma inicial
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langFromUrl = params.get('lang');
    const langFromStorage = localStorage.getItem('lang');

    // Prioridad: 1. URL, 2. LocalStorage, 3. Por defecto ('es')
    const initialLocale = langFromUrl || langFromStorage || 'es';
    _setLocale(initialLocale);
  }, []);

  // Carga los mensajes cuando cambia el idioma
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const module = await import(`../locales/${locale}.json`);
        setMessages(module.default);
        document.documentElement.lang = locale;
      } catch (error) {
        console.error(`Could not load language file for: ${locale}`, error);
        if (locale !== 'en') _setLocale('en'); // Fallback to English
      }
    };
    loadMessages();
  }, [locale]);

  // Función para cambiar el idioma, actualizar la URL y guardar en localStorage
  const setLocale = (newLocale: string) => {
    _setLocale(newLocale);
    localStorage.setItem('lang', newLocale); // Persiste la preferencia

    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLocale);
    // Usa preact-router para actualizar la URL sin recargar la página
    route(url.pathname + url.search, true);
  };

  const t = (key: string, ...args: any[]): string => {
    let translation = messages[key] || key;
    if (args.length > 0) {
      args.forEach((arg, index) => {
        translation = translation.replace(`{${index}}`, arg);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation debe ser usado dentro de un LanguageProvider');
  }
  return context;
};
