// src/ui/mainDiv.tsx
import type { JSX } from "preact/jsx-runtime";
import LangSelector from "../components/Language/LangSelect";
import { useTranslation } from "../context/LanguageContext";
import { LanguageMeta } from "../components/Language/LanguageMeta";
import { NavLink } from "./NavLink";

export default function MainDiv({ children }: { children: JSX.Element }) {
    const { t } = useTranslation();

    return (
        <div class="app-wrapper">
            <LanguageMeta />
            <header class="app-header">
                <div class="header-brand">
                    <h1>{t('app.title')}</h1>
                </div>
                <nav class="header-nav">
                    <NavLink activeClassName="active" href="/">
                        {t('nav.qr_generator')}
                    </NavLink>
                    <NavLink activeClassName="active" href="/video-to-image">
                        {t('nav.video_to_image')}
                    </NavLink>
                </nav>
                <div class="header-controls">
                    <LangSelector />
                </div>
            </header>
            <main class="app-main">{children}</main>
            <footer class="app-footer">
                <p>{t('app.footer')}</p>
                <div class="footer-NavLinks">
                    <a
                        href="https://github.com/edoss-dev/mini-tools"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}
