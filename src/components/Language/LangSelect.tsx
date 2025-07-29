import type { h } from "preact";
import { useTranslation } from "../../context/LanguageContext";

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="globe-icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);
export default function LangSelector() {
    const { locale, setLocale, t } = useTranslation();

    const handleLocaleChange = (e: h.JSX.TargetedEvent<HTMLSelectElement, Event>) => {
        setLocale(e.currentTarget.value);
    };

    return <div class="language-selector-wrapper">
        <label class="lang-select-label" htmlFor="lang-select" title={t('select_language')}>
            <GlobeIcon />
        </label>
        <select
            id="lang-select"
            aria-label={t('select_language')}
            value={locale}
            onChange={handleLocaleChange}
        >
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    </div>


}