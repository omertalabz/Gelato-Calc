import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_INGREDIENTS } from './data/ingredients';
import { TARGET_PROFILES } from './data/profiles';
import { PRESET_RECIPES } from './data/presets';
import { Recipe, RecipeItem, Ingredient } from './types/gelato';
import { calculateRecipeTotals, scaleRecipeItems, getStatus } from './utils/calculator';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { RecipeTable } from './components/RecipeTable';
import { TextureSimulator } from './components/TextureSimulator';
import { IngredientsManager } from './components/IngredientsManager';
import { SugarSolverModal } from './components/SugarSolverModal';
import { BatchScalerModal } from './components/BatchScalerModal';
import { IngredientModal } from './components/IngredientModal';
import { GlossaryModal } from './components/GlossaryModal';
import { PrintTechCard } from './components/PrintTechCard';
import { AndroidGuideModal } from './components/AndroidGuideModal';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { MobileRecipeView } from './components/MobileRecipeView';
import { MobileBalanceView } from './components/MobileBalanceView';
import { MobileToolsView } from './components/MobileToolsView';
import { Language, TRANSLATIONS } from './i18n/translations';
import {
  getLocalizedRecipeName,
  getLocalizedProfileName,
  getLocalizedRecipeInstructions,
} from './i18n/localizedData';
import {
  Download,
  Upload,
  Copy,
  RotateCcw,
  Sparkles,
  BookOpen,
  FolderOpen,
  Bookmark,
  ChevronDown,
} from 'lucide-react';

const LOCAL_STORAGE_RECIPES_KEY = 'gelato_saved_recipes_v1';
const LOCAL_STORAGE_CUSTOM_ING_KEY = 'gelato_custom_ingredients_v1';
const LOCAL_STORAGE_ACTIVE_RECIPE_KEY = 'gelato_active_recipe_v2';
const LOCAL_STORAGE_THEME_KEY = 'gelato_theme_v1';
const LOCAL_STORAGE_LANG_KEY = 'gelato_lang_v1';

export default function App() {
  // Mobile vs Desktop fixed layout state
  const [isMobileLayout, setIsMobileLayout] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return true;
  });

  // Mobile active tab ('recipe' | 'balance' | 'simulator' | 'tools' | 'ingredients')
  const [mobileTab, setMobileTab] = useState<MobileTab>('recipe');

  // Theme state ('light' | 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {}
    return 'light';
  });

  // Language state ('ru' | 'en' | 'it' | 'es')
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (saved === 'ru' || saved === 'en' || saved === 'it' || saved === 'es') return saved;
    } catch {}
    return 'ru';
  });

  // Synchronize documentElement dark class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch {}
  }, [theme]);

  // Synchronize language in storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    } catch {}
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.ru, [lang]);

  // Synchronize HTML lang and document title
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
  }, [lang, t.pageTitle]);

  // Desktop navigation tab
  const [activeTab, setActiveTab] = useState<'recipe' | 'simulator' | 'ingredients'>('recipe');

  // Custom Ingredients Library
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_ING_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combined ingredients list and map
  const allIngredients = useMemo(() => {
    return [...DEFAULT_INGREDIENTS, ...customIngredients];
  }, [customIngredients]);

  const ingredientsMap = useMemo(() => {
    const map = new Map<string, Ingredient>();
    for (const ing of allIngredients) {
      map.set(ing.id, ing);
    }
    return map;
  }, [allIngredients]);

  // Current Recipe with instant LocalStorage restoration
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(() => {
    try {
      const savedActive = localStorage.getItem(LOCAL_STORAGE_ACTIVE_RECIPE_KEY);
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load active recipe from local storage', e);
    }
    return PRESET_RECIPES[0];
  });

  // Saved recipes list in local storage
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RECIPES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active target profile
  const currentProfile = useMemo(() => {
    const found = TARGET_PROFILES.find((p) => p.id === currentRecipe.profileId);
    return found || TARGET_PROFILES[0];
  }, [currentRecipe.profileId]);

  // Real-time calculated totals
  const totals = useMemo(() => {
    return calculateRecipeTotals(currentRecipe.items, ingredientsMap);
  }, [currentRecipe.items, ingredientsMap]);

  // Modals state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isScalerOpen, setIsScalerOpen] = useState(false);
  const [isSugarSolverOpen, setIsSugarSolverOpen] = useState(false);
  const [isCustomIngModalOpen, setIsCustomIngModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isAndroidGuideOpen, setIsAndroidGuideOpen] = useState(false);

  // Auto-save active recipe whenever any grammage or parameter changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_RECIPE_KEY, JSON.stringify(currentRecipe));
    } catch (e) {
      console.error('Failed to auto-save active recipe', e);
    }
  }, [currentRecipe]);

  // Save custom ingredients to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_ING_KEY, JSON.stringify(customIngredients));
    } catch (e) {
      console.error(e);
    }
  }, [customIngredients]);

  // Save custom recipes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RECIPES_KEY, JSON.stringify(savedRecipes));
    } catch (e) {
      console.error(e);
    }
  }, [savedRecipes]);

  // Recipe Handlers
  const handleUpdateWeight = (index: number, weight: number) => {
    const nextItems = [...currentRecipe.items];
    nextItems[index] = { ...nextItems[index], weight: Math.max(0, weight) };
    setCurrentRecipe({ ...currentRecipe, items: nextItems, updatedAt: Date.now() });
  };

  const handleRemoveItem = (index: number) => {
    const nextItems = currentRecipe.items.filter((_, i) => i !== index);
    setCurrentRecipe({ ...currentRecipe, items: nextItems, updatedAt: Date.now() });
  };

  const handleAddItem = (ingredientId: string, initialWeight = 50) => {
    // Check if ingredient already exists
    const existingIndex = currentRecipe.items.findIndex((i) => i.ingredientId === ingredientId);
    if (existingIndex >= 0) {
      const nextItems = [...currentRecipe.items];
      nextItems[existingIndex].weight += initialWeight;
      setCurrentRecipe({ ...currentRecipe, items: nextItems, updatedAt: Date.now() });
    } else {
      setCurrentRecipe({
        ...currentRecipe,
        items: [...currentRecipe.items, { ingredientId, weight: initialWeight }],
        updatedAt: Date.now(),
      });
    }
  };

  const handleSelectPreset = (preset: Recipe) => {
    setCurrentRecipe({
      ...preset,
      updatedAt: Date.now(),
    });
  };

  const handleSelectProfile = (profileId: string) => {
    setCurrentRecipe({
      ...currentRecipe,
      profileId,
      updatedAt: Date.now(),
    });
  };

  const handleScaleBatch = (targetWeight: number) => {
    const scaledItems = scaleRecipeItems(currentRecipe.items, totals.totalWeight, targetWeight);
    setCurrentRecipe({
      ...currentRecipe,
      items: scaledItems,
      updatedAt: Date.now(),
    });
  };

  const handleApplySugars = (sucroseGrams: number, dextroseGrams: number) => {
    let nextItems = [...currentRecipe.items];

    // Update or add Sucrose
    const sucroseIndex = nextItems.findIndex((i) => i.ingredientId === 'sucrose');
    if (sucroseIndex >= 0) {
      nextItems[sucroseIndex] = { ...nextItems[sucroseIndex], weight: sucroseGrams };
    } else if (sucroseGrams > 0) {
      nextItems.push({ ingredientId: 'sucrose', weight: sucroseGrams });
    }

    // Update or add Dextrose
    const dextroseIndex = nextItems.findIndex((i) => i.ingredientId === 'dextrose');
    if (dextroseIndex >= 0) {
      nextItems[dextroseIndex] = { ...nextItems[dextroseIndex], weight: dextroseGrams };
    } else if (dextroseGrams > 0) {
      nextItems.push({ ingredientId: 'dextrose', weight: dextroseGrams });
    }

    // Filter out 0 weight items
    nextItems = nextItems.filter((i) => i.weight > 0);

    setCurrentRecipe({
      ...currentRecipe,
      items: nextItems,
      updatedAt: Date.now(),
    });
  };

  const handleSaveCustomIngredient = (ingredient: Ingredient) => {
    setCustomIngredients((prev) => [...prev, ingredient]);
  };

  const handleDeleteCustomIngredient = (id: string) => {
    setCustomIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveCurrentRecipe = () => {
    const existingIndex = savedRecipes.findIndex((r) => r.id === currentRecipe.id);
    if (existingIndex >= 0) {
      const updated = [...savedRecipes];
      updated[existingIndex] = { ...currentRecipe, updatedAt: Date.now() };
      setSavedRecipes(updated);
    } else {
      setSavedRecipes([...savedRecipes, { ...currentRecipe, updatedAt: Date.now() }]);
    }
  };

  const handleNewRecipe = () => {
    const defaultNames: Record<Language, string> = {
      ru: 'Базовая смесь со Stellamix C.F. 100',
      en: 'Base Mix with Stellamix C.F. 100',
      it: 'Base bianca con Stellamix C.F. 100',
      es: 'Base blanca con Stellamix C.F. 100',
    };
    setCurrentRecipe({
      id: `custom_${Date.now()}`,
      name: defaultNames[lang] || defaultNames.ru,
      names: defaultNames,
      profileId: 'milky',
      items: [
        { ingredientId: 'milk_3_5', weight: 550 },
        { ingredientId: 'cream_35', weight: 120 },
        { ingredientId: 'sucrose', weight: 194 },
        { ingredientId: 'dextrose', weight: 40 },
        { ingredientId: 'smp_powder', weight: 26 },
        { ingredientId: 'stellamix_cf_100', weight: 70 },
      ],
      updatedAt: Date.now(),
    });
    setActiveTab('recipe');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentRecipe, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentRecipe.name.replace(/\s+/g, '_')}_formula.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.items && Array.isArray(parsed.items)) {
          setCurrentRecipe({
            ...parsed,
            id: `imported_${Date.now()}`,
            updatedAt: Date.now(),
          });
        }
      } catch (err) {
        console.error('Import error', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Status check for mobile navigation badge
  const fatStatus = getStatus(totals.fatPercent, currentProfile.fat);
  const podStatus = getStatus(totals.podTotal, currentProfile.pod);
  const pacStatus = getStatus(totals.pacTotal, currentProfile.pac);
  const balanceStatus: 'ideal' | 'warning' =
    fatStatus === 'ideal' && podStatus === 'ideal' && pacStatus === 'ideal' ? 'ideal' : 'warning';

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col overflow-hidden bg-[#F8F9FA] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans select-none transition-colors">
      {/* Top Bar Header */}
      <Header
        activeTab={isMobileLayout ? (mobileTab as any) : activeTab}
        setActiveTab={(tab) => {
          if (isMobileLayout) {
            setMobileTab(tab);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenScaler={() => setIsScalerOpen(true)}
        onOpenSugarSolver={() => setIsSugarSolverOpen(true)}
        onPrint={() => setIsPrintModalOpen(true)}
        onNewRecipe={handleNewRecipe}
        onOpenAndroidGuide={() => setIsAndroidGuideOpen(true)}
        isMobileLayout={isMobileLayout}
        onToggleMobileLayout={() => setIsMobileLayout(!isMobileLayout)}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onChangeLang={setLang}
        t={t}
      />

      {/* Conditional Rendering: Mobile Fixed Viewport vs Desktop Viewport */}
      {isMobileLayout ? (
        <>
          {/* Mobile Main Active Screen View (Fixed, zero outer page movements) */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {mobileTab === 'recipe' && (
              <MobileRecipeView
                recipe={currentRecipe}
                ingredientsMap={ingredientsMap}
                allIngredients={allIngredients}
                totals={totals}
                profile={currentProfile}
                onUpdateWeight={handleUpdateWeight}
                onRemoveItem={handleRemoveItem}
                onAddItem={handleAddItem}
                onUpdateRecipeName={(name) =>
                  setCurrentRecipe({
                    ...currentRecipe,
                    name,
                    isCustomName: true,
                    names: { ...(currentRecipe.names || {}), [lang]: name },
                    updatedAt: Date.now(),
                  })
                }
                onUpdateInstructions={(instructions) =>
                  setCurrentRecipe({
                    ...currentRecipe,
                    instructions,
                    isCustomInstructions: true,
                    instructionsLang: { ...(currentRecipe.instructionsLang || {}), [lang]: instructions },
                    updatedAt: Date.now(),
                  })
                }
                onOpenBalanceTab={() => setMobileTab('balance')}
                onOpenCustomModal={() => setIsCustomIngModalOpen(true)}
                lang={lang}
                t={t}
              />
            )}

            {mobileTab === 'balance' && (
              <MobileBalanceView
                totals={totals}
                profile={currentProfile}
                onOpenSugarSolver={() => setIsSugarSolverOpen(true)}
                onOpenSimulator={() => setMobileTab('simulator')}
                lang={lang}
                t={t}
              />
            )}

            {mobileTab === 'simulator' && (
              <div className="flex-1 overflow-y-auto overscroll-contain p-3 custom-scrollbar">
                <TextureSimulator totals={totals} lang={lang} t={t} />
              </div>
            )}

            {mobileTab === 'tools' && (
              <MobileToolsView
                currentRecipe={currentRecipe}
                currentProfile={currentProfile}
                onSelectPreset={handleSelectPreset}
                onSelectProfile={handleSelectProfile}
                onOpenSugarSolver={() => setIsSugarSolverOpen(true)}
                onOpenScaler={() => setIsScalerOpen(true)}
                onPrint={() => setIsPrintModalOpen(true)}
                onSaveRecipe={handleSaveCurrentRecipe}
                onExportJSON={handleExportJSON}
                onImportJSON={handleImportJSON}
                onResetToDefault={() => handleSelectPreset(PRESET_RECIPES[0])}
                onOpenGlossary={() => setIsGlossaryOpen(true)}
                onOpenAndroidGuide={() => setIsAndroidGuideOpen(true)}
                onNewRecipe={handleNewRecipe}
                onGoToRecipe={() => setMobileTab('recipe')}
                theme={theme}
                onToggleTheme={toggleTheme}
                lang={lang}
                onChangeLang={setLang}
                t={t}
              />
            )}

            {mobileTab === 'ingredients' && (
              <div className="flex-1 overflow-y-auto overscroll-contain p-3 custom-scrollbar">
                <IngredientsManager
                  ingredients={allIngredients}
                  onOpenAddModal={() => setIsCustomIngModalOpen(true)}
                  onDeleteCustom={handleDeleteCustomIngredient}
                  lang={lang}
                  t={t}
                />
              </div>
            )}
          </div>

          {/* Fixed Bottom Navigation Bar for Mobile */}
          <MobileBottomNav
            activeTab={mobileTab}
            onChangeTab={setMobileTab}
            balanceStatus={balanceStatus}
            t={t}
          />
        </>
      ) : (
        /* Full Desktop Table View with internal scrollable container */
        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar flex flex-col">
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
            {activeTab === 'recipe' && (
              <>
                {/* Top Workspace Controls: Presets bar & Target Profile Selector */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-4 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Recipe Name & Profile Indicator */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {t.tabRecipe}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-xs text-amber-800 dark:text-amber-400 font-medium">
                          {t.targetTemp} {currentProfile.targetTemp}°C
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/80 dark:border-emerald-800/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {t.autoSaved}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={getLocalizedRecipeName(currentRecipe, lang)}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCurrentRecipe({
                            ...currentRecipe,
                            name: val,
                            isCustomName: true,
                            names: { ...(currentRecipe.names || {}), [lang]: val },
                            updatedAt: Date.now(),
                          });
                        }}
                        className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-slate-800 dark:focus:border-slate-300 focus:outline-none w-full transition-colors"
                      />
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-1.5">
                        <span>
                          {getLocalizedProfileName(currentProfile, lang)} ({currentProfile.targetTemp}°C)
                        </span>
                      </div>
                    </div>

                    {/* Target Profile Selector */}
                    <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {t.profileTitle}:
                      </span>
                      <select
                        value={currentRecipe.profileId}
                        onChange={(e) => handleSelectProfile(e.target.value)}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
                      >
                        {TARGET_PROFILES.map((p) => (
                          <option key={p.id} value={p.id}>
                            {getLocalizedProfileName(p, lang)} ({t.targetTemp} {p.targetTemp}°C)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preset Quick Load Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap mr-1">
                        {t.presetsTitle}:
                      </span>
                      {PRESET_RECIPES.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap ${
                            currentRecipe.id === preset.id
                              ? 'bg-slate-900 dark:bg-amber-600 text-white font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                          }`}
                        >
                          {getLocalizedRecipeName(preset, lang).split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Actions: Save, Export, Import, Reset */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          if (window.confirm(t.resetConfirm)) {
                            handleSelectPreset(PRESET_RECIPES[0]);
                          }
                        }}
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={t.resetDefault}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleSaveCurrentRecipe}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-md transition-colors flex items-center gap-1"
                        title={t.saveRecipe}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{t.saveRecipe.split(' ')[0]}</span>
                      </button>

                      <button
                        onClick={handleExportJSON}
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={t.exportJSON}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <label
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title={t.importJSON}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJSON}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* 3 Core Parameters & Balancing Gauge Overview */}
                <MetricsOverview totals={totals} profile={currentProfile} t={t} />

                {/* High-Density Recipe Ingredients Spreadsheet */}
                <RecipeTable
                  items={currentRecipe.items}
                  ingredientsMap={ingredientsMap}
                  allIngredients={allIngredients}
                  totals={totals}
                  profile={currentProfile}
                  onUpdateWeight={handleUpdateWeight}
                  onRemoveItem={handleRemoveItem}
                  onAddItem={handleAddItem}
                  onOpenCustomIngredientModal={() => setIsCustomIngModalOpen(true)}
                  lang={lang}
                  t={t}
                />

                {/* Recipe Production Notes / Instructions */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {t.notesTitle}
                  </h3>
                  <textarea
                    rows={3}
                    placeholder={t.notesPlaceholder}
                    value={getLocalizedRecipeInstructions(currentRecipe, lang) || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCurrentRecipe({
                        ...currentRecipe,
                        instructions: val,
                        isCustomInstructions: true,
                        instructionsLang: { ...(currentRecipe.instructionsLang || {}), [lang]: val },
                        updatedAt: Date.now(),
                      });
                    }}
                    className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-750 focus:border-slate-800 dark:focus:border-slate-300 font-sans transition-colors leading-relaxed"
                  />
                </div>
              </>
            )}

            {activeTab === 'simulator' && <TextureSimulator totals={totals} lang={lang} t={t} />}

            {activeTab === 'ingredients' && (
              <IngredientsManager
                ingredients={allIngredients}
                onOpenAddModal={() => setIsCustomIngModalOpen(true)}
                onDeleteCustom={handleDeleteCustomIngredient}
                lang={lang}
                t={t}
              />
            )}
          </main>

          {/* Desktop Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 mt-auto transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
              <div>
                Gelato Bilanciamento · {t.appSubtitle}
              </div>
              <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                <span>{t.fat}</span>
                <span>·</span>
                <span>{t.pod}</span>
                <span>·</span>
                <span>{t.pac}</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Modals */}
      <SugarSolverModal
        isOpen={isSugarSolverOpen}
        onClose={() => setIsSugarSolverOpen(false)}
        totals={totals}
        profile={currentProfile}
        items={currentRecipe.items}
        onApplySugars={handleApplySugars}
        lang={lang}
        t={t}
      />

      <BatchScalerModal
        isOpen={isScalerOpen}
        onClose={() => setIsScalerOpen(false)}
        currentWeight={totals.totalWeight}
        onScale={handleScaleBatch}
        lang={lang}
        t={t}
      />

      <IngredientModal
        isOpen={isCustomIngModalOpen}
        onClose={() => setIsCustomIngModalOpen(false)}
        onSave={handleSaveCustomIngredient}
        lang={lang}
        t={t}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        lang={lang}
        t={t}
      />

      {isPrintModalOpen && (
        <PrintTechCard
          recipe={currentRecipe}
          totals={totals}
          profile={currentProfile}
          ingredientsMap={ingredientsMap}
          onClose={() => setIsPrintModalOpen(false)}
          lang={lang}
          t={t}
        />
      )}

      <AndroidGuideModal
        isOpen={isAndroidGuideOpen}
        onClose={() => setIsAndroidGuideOpen(false)}
        lang={lang}
        t={t}
      />
    </div>
  );
}
