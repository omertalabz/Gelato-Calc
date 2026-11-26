import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Printer, Plus, BookOpen, Scale, Wand2, Smartphone, Sun, Moon, Globe, ChevronDown, Download } from 'lucide-react';
import { Language, Translations, LANGUAGE_OPTIONS } from '../i18n/translations';

interface HeaderProps {
  activeTab: 'recipe' | 'balance' | 'simulator' | 'ingredients' | 'tools';
  setActiveTab: (tab: any) => void;
  onOpenGlossary: () => void;
  onOpenScaler: () => void;
  onOpenSugarSolver: () => void;
  onPrint: () => void;
  onNewRecipe: () => void;
  onOpenAndroidGuide: () => void;
  isMobileLayout: boolean;
  onToggleMobileLayout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenGlossary,
  onOpenScaler,
  onOpenSugarSolver,
  onPrint,
  onNewRecipe,
  onOpenAndroidGuide,
  isMobileLayout,
  onToggleMobileLayout,
  theme,
  onToggleTheme,
  lang,
  onChangeLang,
  t,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangOption = LANGUAGE_OPTIONS.find((o) => o.code === lang) || LANGUAGE_OPTIONS[0];

  return (
    <header className="shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-12 sm:h-14 md:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('recipe');
            }}
            className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-serif"
          >
            {t.appTitle}
          </a>
          <span className="hidden sm:inline-block text-[11px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/60">
            {t.appSubtitle}
          </span>
        </div>

        {/* Zone 2: Navigation Links (Desktop view) */}
        {!isMobileLayout && (
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('recipe')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'recipe'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.tabRecipe}
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.tabShowcase}
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'ingredients'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.tabIngredients}
            </button>
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              {t.glossary}
            </button>
          </nav>
        )}

        {/* Zone 3: Primary actions, Theme & Language toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 transition-colors"
              title={t.language}
            >
              <span className="text-sm">{currentLangOption.flag}</span>
              <span className="font-mono text-[11px] uppercase">{currentLangOption.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      onChangeLang(opt.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between transition-colors ${
                      lang === opt.code
                        ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-950 dark:text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                    </span>
                    {lang === opt.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-colors"
            title={theme === 'dark' ? t.themeLight : t.themeDark}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* Android / APK ZIP Guide button */}
          <button
            onClick={onOpenAndroidGuide}
            title={t.androidGuide}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border-emerald-200 dark:border-emerald-800/80"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">APK / ZIP</span>
          </button>

          {/* Toggle between Fixed Mobile View and Desktop Table */}
          <button
            onClick={onToggleMobileLayout}
            title={isMobileLayout ? t.desktopMode : t.phoneMode}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700"
          >
            <Smartphone className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span className="hidden sm:inline">
              {isMobileLayout ? t.phoneMode : t.desktopMode}
            </span>
          </button>

          {!isMobileLayout && (
            <>
              <button
                onClick={onOpenSugarSolver}
                title={t.sugarSolverDesc}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <Wand2 className="w-3.5 h-3.5" />
                {t.sugarSolver}
              </button>
              <button
                onClick={onOpenScaler}
                title={t.scaleBatchDesc}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t.scaleBatch}</span>
              </button>
              <button
                onClick={onPrint}
                title={t.techCardDesc}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.techCard}</span>
              </button>
            </>
          )}

          <button
            onClick={onNewRecipe}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg transition-colors whitespace-nowrap shadow-2xs active:scale-95"
            title={t.newRecipe}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.newRecipe}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

