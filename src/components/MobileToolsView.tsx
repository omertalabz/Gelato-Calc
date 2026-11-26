import React from 'react';
import { Recipe, TargetProfile } from '../types/gelato';
import { PRESET_RECIPES } from '../data/presets';
import { TARGET_PROFILES } from '../data/profiles';
import { Language, Translations, LANGUAGE_OPTIONS } from '../i18n/translations';
import { getLocalizedProfileName, getLocalizedRecipeName } from '../i18n/localizedData';
import {
  Wand2,
  Scale,
  Printer,
  Bookmark,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  Smartphone,
  Check,
  ChevronRight,
  PlusCircle,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';

interface MobileToolsViewProps {
  currentRecipe: Recipe;
  currentProfile: TargetProfile;
  onSelectPreset: (preset: Recipe) => void;
  onSelectProfile: (profileId: string) => void;
  onOpenSugarSolver: () => void;
  onOpenScaler: () => void;
  onPrint: () => void;
  onSaveRecipe: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetToDefault: () => void;
  onOpenGlossary: () => void;
  onOpenAndroidGuide: () => void;
  onNewRecipe: () => void;
  onGoToRecipe: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  t: Translations;
}

export const MobileToolsView: React.FC<MobileToolsViewProps> = ({
  currentRecipe,
  currentProfile,
  onSelectPreset,
  onSelectProfile,
  onOpenSugarSolver,
  onOpenScaler,
  onPrint,
  onSaveRecipe,
  onExportJSON,
  onImportJSON,
  onResetToDefault,
  onOpenGlossary,
  onOpenAndroidGuide,
  onNewRecipe,
  onGoToRecipe,
  theme,
  onToggleTheme,
  lang,
  onChangeLang,
  t,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FA] dark:bg-slate-950 transition-colors">
      {/* Top Fixed Header */}
      <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
            {t.tabTools}
          </h2>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.presetsTitle}, {t.sugarSolver}, {t.scaleBatch}
          </div>
        </div>
        <button
          onClick={onNewRecipe}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg shadow-2xs active:scale-95 transition-transform"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{t.newRecipe}</span>
        </button>
      </div>

      {/* Scrollable Container inside fixed viewport */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-4 custom-scrollbar">
        {/* Section 0: Theme and Language Picker */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.theme} & {t.language}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs space-y-3">
            {/* Theme switcher */}
            <div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t.theme}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => theme !== 'light' && onToggleTheme()}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                    theme === 'light'
                      ? 'border-slate-900 bg-slate-900 text-white font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t.themeLight}</span>
                </button>
                <button
                  onClick={() => theme !== 'dark' && onToggleTheme()}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-white bg-white text-slate-950 font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>{t.themeDark}</span>
                </button>
              </div>
            </div>

            {/* Language switcher */}
            <div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t.language}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => onChangeLang(opt.code)}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      lang === opt.code
                        ? 'border-slate-900 dark:border-amber-500 bg-slate-900 dark:bg-amber-600 text-white font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Android APK & ZIP Download Card */}
        <button
          onClick={onOpenAndroidGuide}
          className="w-full p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm flex items-center justify-between gap-3 text-left transition-colors active:scale-99"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white/15 rounded-lg shrink-0">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">
                {t.downloadGitHubZipBtn}
              </div>
              <div className="text-[11px] text-indigo-100 truncate">
                {t.androidGuide} · gelato-bilanciamento-github-apk.zip
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-200 shrink-0" />
        </button>

        {/* Section 1: Core Calculation Tools */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.sugarSolver} & {t.scaleBatch}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Sugar Solver */}
            <button
              onClick={onOpenSugarSolver}
              className="p-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/80 rounded-xl shadow-2xs flex flex-col items-start text-left hover:border-indigo-400 dark:hover:border-indigo-600 active:scale-98 transition-all"
            >
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-lg mb-2">
                <Wand2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.sugarSolver}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t.sugarSolverDesc}
              </div>
            </button>

            {/* Batch Scaler */}
            <button
              onClick={onOpenScaler}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs flex flex-col items-start text-left hover:border-slate-400 dark:hover:border-slate-700 active:scale-98 transition-all"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg mb-2">
                <Scale className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t.scaleBatch}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {t.scaleBatchDesc}
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Tech Card */}
            <button
              onClick={onPrint}
              className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:scale-98 transition-all text-left"
            >
              <Printer className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {t.techCard}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">{t.techCardDesc}</div>
              </div>
            </button>

            {/* Glossary */}
            <button
              onClick={onOpenGlossary}
              className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 active:scale-98 transition-all text-left"
            >
              <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {t.glossary}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">{t.glossaryDesc}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Presets Quick Load */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.presetsTitle}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">{PRESET_RECIPES.length}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-2xs">
            {PRESET_RECIPES.map((preset) => {
              const isSelected = currentRecipe.id === preset.id;
              const presetProfile = TARGET_PROFILES.find((p) => p.id === preset.profileId);
              const presetTemp = presetProfile ? presetProfile.targetTemp : -11;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset);
                    onGoToRecipe();
                  }}
                  className={`w-full p-2.5 text-left flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-slate-50 dark:bg-slate-800/80'
                      : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate flex items-center gap-1.5">
                      <span>{getLocalizedRecipeName(preset, lang)}</span>
                      {preset.items.some((i) => i.ingredientId.includes('stellamix')) && (
                        <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1 py-0.2 rounded border border-amber-200/60 dark:border-amber-800/60">
                          Stella
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {preset.items.length} {t.itemsShort} · {t.targetTemp}: {presetTemp}°C
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/80 dark:border-emerald-800/80 shrink-0">
                      ✓
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Target Profile Selector */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.profileTitle}
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-2xs space-y-1.5">
            <select
              value={currentProfile.id}
              onChange={(e) => onSelectProfile(e.target.value)}
              className="w-full p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
            >
              {TARGET_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {getLocalizedProfileName(p, lang)} ({t.targetTemp} {p.targetTemp}°C)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 4: Data Management & PWA */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.saveRecipe} & {t.exportJSON}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-2xs">
            <button
              onClick={onSaveRecipe}
              className="w-full p-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t.saveRecipe}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </button>

            <button
              onClick={onExportJSON}
              className="w-full p-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t.exportJSON}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </button>

            <label className="w-full p-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t.importJSON}</span>
              </div>
              <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </label>

            <button
              onClick={() => {
                if (window.confirm(t.resetConfirm)) {
                  onResetToDefault();
                  onGoToRecipe();
                }
              }}
              className="w-full p-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-rose-700 dark:text-rose-400"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span>{t.resetDefault}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            </button>

            <button
              onClick={onOpenAndroidGuide}
              className="w-full p-2.5 text-left flex items-center justify-between hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-xs font-medium text-emerald-800 dark:text-emerald-300"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.androidGuide}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Spacer for bottom tab bar */}
        <div className="h-6" />
      </div>
    </div>
  );
};

