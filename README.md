# Mini Tools - Una Colección de Utilidades Web

 <!-- TODO: Reemplaza con una captura de tu app -->

**Mini Tools** es una aplicación web construida con Preact y Vite que ofrece una suite de herramientas pequeñas y eficientes para tareas cotidianas. La primera herramienta disponible es un potente **Generador de Códigos QR** con múltiples opciones de personalización.

## ✨ Características del Generador de QR

Crea códigos QR únicos y atractivos con una amplia gama- de opciones de personalización:

- **Contenido Personalizable**: Genera códigos QR para URLs, texto, números de teléfono, o cualquier otra información.
- **Estilo de Puntos**: Elige entre diferentes formas para los módulos del QR:
  - Cuadrados
  - Puntos redondos
  - Bordes redondeados
  - Estilo "classy"
- **Colores y Degradados**:
  - Selecciona un color sólido de una paleta predefinida o un selector de color.
  - Aplica degradados lineales o radiales con rotación personalizable para un diseño más dinámico.
- **Fondo**:
  - Configura un color de fondo sólido.
  - Haz el fondo transparente para superponer el QR en otras imágenes.
  - ¡Próximamente: fondos con degradados y patrones!
- **Logo o Imagen Central**:
  - Añade tu logo o cualquier imagen en el centro del código QR.
  - Ajusta el tamaño y el margen de la imagen para una integración perfecta.
- **Descarga en Múltiples Formatos**:
  - Descarga tu código QR en formatos de alta calidad: **PNG, JPEG, WEBP y SVG**.

## 🚀 Cómo Usarlo

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/mini-tools.git
    cd mini-tools
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
4.  Abre tu navegador y visita `http://localhost:5173` (o el puerto que indique Vite).

## 🛠️ Tecnologías Utilizadas

- **Preact**: Una alternativa rápida y ligera a React con la misma API.
- **Vite**: Un entorno de desarrollo de frontend moderno y ultrarrápido.
- **TypeScript**: Para un código más robusto y mantenible.
- **qr-code-styling**: La librería que hace posible la magia de la personalización de los QR.

## 🔮 Próximas Herramientas

Esta aplicación crecerá para incluir más utilidades. Las próximas ideas incluyen:

- **Extractor de Imágenes de Video**: Sube un video y extrae fotogramas en intervalos específicos.
- **Generador de Paletas de Colores**: Extrae la paleta de colores principal de una imagen.
- **Compresor de Imágenes**: Reduce el tamaño de tus imágenes sin perder demasiada calidad.

---

## 🏷️ SEO y Metadatos

**Meta Título:** Mini Tools - Generador de QR Personalizado y Herramientas Web

**Meta Descripción:** Crea y personaliza códigos QR con logos, colores y degradados. Descarga en PNG, SVG y más. Una suite de herramientas web rápidas y gratuitas para tus necesidades diarias.

**Palabras Clave (Keywords):**
`generador de qr`, `crear código qr`, `qr con logo`, `qr personalizado`, `qr online`, `qr gratis`, `qr code generator`, `custom qr code`, `qr con imagen`, `qr transparente`, `qr svg`, `herramientas web`, `mini tools`, `preact`, `vite`, `utilidades online`

```

---

Espero que estas mejoras y el `README.md` te sean de gran ayuda para tu proyecto. ¡Tiene mucho potencial!

<!--
[PROMPT_SUGGESTION]¿Cómo puedo añadir una nueva herramienta a la aplicación, como un extractor de imágenes de video, y agregar una ruta para ella?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Refactoriza los componentes de control del QR para que usen un estado global con `createContext` y `useContext` de Preact.[/PROMPT_SUGGESTION]
-->