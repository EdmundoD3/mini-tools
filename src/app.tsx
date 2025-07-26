import './app.css'
import { QRCodeGenerator } from './components/QRCodeGenerator'

export function App() {
  return (
    <div class="app">
      <h1>Generador de QR</h1>
      <QRCodeGenerator />
    </div>
  );
}
