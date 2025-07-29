import type { JSX } from "preact/jsx-runtime";
import LangSelector from "../components/Language/LangSelect";
import { Link } from "preact-router/match";
import { useTranslation } from "../context/LanguageContext";
import { LanguageMeta } from "../components/Language/LanguageMeta";


export default function MainDiv({ children }: { children: JSX.Element }) {
    const { t } = useTranslation();
    return <div class="app-wrapper">
        <LanguageMeta />
        <header class="app-header">
            <div class="header-brand">
                <h1>{t('app.title')}</h1>
            </div>
            <nav class="header-nav">
                <Link activeClassName="active" href="/">{t('nav.qr_generator')}</Link>
                <Link activeClassName="active" href="/video-to-image">{t('nav.video_to_image')}</Link>
            </nav>
            <div class="header-controls">
                <LangSelector />
            </div>
        </header>
        <main class="app-main">
            {children}
        </main>
        <footer class="app-footer">
            <p>{t('app.footer')}</p>
            <div class="footer-links">
                <a href="https://github.com/edoss-dev/mini-tools" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </footer>
    </div>
}
