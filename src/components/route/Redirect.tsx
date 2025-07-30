import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

interface RedirectProps {
  to: string;
  path:string;
}

export function Redirect({ to }: RedirectProps) {
  useEffect(() => {
    route(to, true); // El segundo argumento 'true' reemplaza la URL en el historial
  }, [to]);

  return null;
}