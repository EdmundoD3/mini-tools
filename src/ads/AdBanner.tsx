// src/components/AdBanner.tsx
import { useEffect } from 'preact/hooks';
import './AdBanner.css';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error al cargar el anuncio de AdSense:", e);
    }
  }, []);

  // No renderizar el contenedor si no hay IDs para evitar errores y espacios vacíos.
  if (!import.meta.env.VITE_ADSENSE_CLIENT_ID || !import.meta.env.VITE_ADSENSE_SLOT_ID) {
    return null;
  }

  return (
    <div class="ad-container">
      <ins class="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
           data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ID}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};