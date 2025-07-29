import { useEffect } from 'preact/hooks';

// Lista de idiomas soportados. Mantenla actualizada.
const SUPPORTED_LOCALES = ['es', 'en'];

// Idioma por defecto para la etiqueta x-default
const DEFAULT_LOCALE = 'es';

/**
 * Este componente gestiona las etiquetas <link rel="alternate" hreflang="...">
 * en el <head> del documento para mejorar el SEO multilingüe.
 * No renderiza nada en el DOM.
 */
export const LanguageMeta = () => {
  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    // Limpiar etiquetas hreflang anteriores para evitar duplicados
    document.querySelectorAll('link[rel="alternate"]').forEach(tag => tag.remove());

    // Crear y añadir una etiqueta para cada idioma soportado
    SUPPORTED_LOCALES.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      currentUrl.searchParams.set('lang', lang);
      link.href = currentUrl.href;
      document.head.appendChild(link);
    });

    // Añadir la etiqueta x-default para los buscadores
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    currentUrl.searchParams.set('lang', DEFAULT_LOCALE);
    defaultLink.href = currentUrl.href;
    document.head.appendChild(defaultLink);

  }, []); // Se ejecuta solo una vez al montar el componente

  return null;
};