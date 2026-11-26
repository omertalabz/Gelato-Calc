import React, { useState } from 'react';
import { Recipe, RecipeItem, Ingredient, RecipeTotals, TargetProfile } from '../types/gelato';
import { getStatus } from '../utils/calculator';
import { Plus, Trash2, Search, X, ChevronRight, Sparkles, Scale, Info, Edit3, Check } from 'lucide-react';
import { Language, Translations } from '../i18n/translations';
import {
  getLocalizedIngredientName,
  getLocalizedProfileName,
  getLocalizedRecipeName,
  getLocalizedRecipeInstructions,
} from '../i18n/localizedData';

interface MobileRecipeViewProps {
  recipe: Recipe;
  ingredientsMap: Map<string, Ingredient>;
  allIngredients: Ingredient[];
  totals: RecipeTotals;
  profile: TargetProfile;
  onUpdateWeight: (index: number, weight: number) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: (ingredientId: string, initialWeight?: number) => void;
  onUpdateRecipeName: (name: string) => void;
  onUpdateInstructions: (instructions: string) => void;
  onOpenBalanceTab: () => void;
  onOpenCustomModal: () => void;
  lang?: Language;
  t: Translations;
}

export const MobileRecipeView: React.FC<MobileRecipeViewProps> = ({
  recipe,
  ingredientsMap,
  allIngredients,
  totals,
  profile,
  onUpdateWeight,
  onRemoveItem,
  onAddItem,
  onUpdateRecipeName,
  onUpdateInstructions,
  onOpenBalanceTab,
  onOpenCustomModal,
  lang = 'ru',
  t,
}) => {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(recipe.name);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Status check for live ribbon
  const fatStatus = getStatus(totals.fatPercent, profile.fat);
  const podStatus = getStatus(totals.podTotal, profile.pod);
  const pacStatus = getStatus(totals.pacTotal, profile.pac);
  const isOverallIdeal = fatStatus === 'ideal' && podStatus === 'ideal' && pacStatus === 'ideal';

  // Categories with localized labels
  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'dairy', label: t.catDairy },
    { id: 'sugars', label: t.catSugars },
    { id: 'pastes', label: t.catPastes },
    { id: 'chocolate', label: t.catChocolate },
    { id: 'stabilizers', label: t.catStabilizers },
  ];

  const filteredIngredients = allIngredients.filter((ing) => {
    const q = searchQuery.toLowerCase();
    const locName = getLocalizedIngredientName(ing, lang).toLowerCase();
    const matchesSearch =
      locName.includes(q) ||
      ing.name.toLowerCase().includes(q) ||
      (ing.nameIt && ing.nameIt.toLowerCase().includes(q));
    const matchesCat = selectedCategory === 'all' || ing.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateRecipeName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  const localizedProfileName = getLocalizedProfileName(profile, lang);
  const localizedRecipeName = getLocalizedRecipeName(recipe, lang);
  const localizedInstructions = getLocalizedRecipeInstructions(recipe, lang);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FA] dark:bg-slate-950 transition-colors">
      {/* 1. Compact Pinned Header */}
      <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-2 transition-colors">
        <div className="flex items-center justify-between gap-2">
          {/* Recipe Name */}
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onBlur={handleSaveName}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  autoFocus
                  className="w-full text-sm font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded shrink-0"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setNameInput(localizedRecipeName);
                  setIsEditingName(true);
                }}
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate font-serif">
                  {localizedRecipeName}
                </h1>
                <Edit3 className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 shrink-0" />
              </div>
            )}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="font-medium text-amber-800 dark:text-amber-400">{localizedProfileName}</span>
              <span>·</span>
              <span className="font-mono">{recipe.items.length} {t.itemsShort}</span>
              <span>·</span>
              <button
                onClick={() => setIsNotesOpen(true)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline text-[10px]"
              >
                {t.notes} {localizedInstructions ? '•' : ''}
              </button>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => setIsAddSheetOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg shrink-0 shadow-2xs active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addIngredient}</span>
          </button>
        </div>

        {/* 2. Pinned Live Balance Ribbon (Tap opens Balance Tab) */}
        <button
          onClick={onOpenBalanceTab}
          className="w-full mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOverallIdeal ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <div className="flex items-baseline gap-2 font-mono text-[11px] text-slate-700 dark:text-slate-300 flex-wrap">
              <span>
                <strong>{totals.totalWeight.toFixed(0)}</strong>{t.unitGram}
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>
                {t.fat.split(' ')[0]}: <strong>{totals.fatPercent.toFixed(1)}%</strong>
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>
                POD: <strong className="text-amber-900 dark:text-amber-400">{totals.podTotal.toFixed(1)}</strong>
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span>
                PAC: <strong className="text-cyan-900 dark:text-cyan-400">{totals.pacTotal.toFixed(1)}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center text-[10px] text-slate-500 dark:text-slate-400 font-medium shrink-0 ml-1">
            <span>{t.tabBalance}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 3. Touch-Friendly Ingredients List (Fixed internal scrollable area) */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 space-y-2 custom-scrollbar">
        {recipe.items.length === 0 ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500">
            <p className="text-xs">{t.recipeEmpty}</p>
            <button
              onClick={() => setIsAddSheetOpen(true)}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-2xs"
            >
              {t.addFirstIngredient}
            </button>
          </div>
        ) : (
          recipe.items.map((item, index) => {
            const ing = ingredientsMap.get(item.ingredientId);
            if (!ing) return null;

            const percent = totals.totalWeight > 0 ? (item.weight / totals.totalWeight) * 100 : 0;
            const isBase = ing.id.includes('stellamix') || ing.category === 'stabilizers';
            const localizedName = getLocalizedIngredientName(ing, lang);

            return (
              <div
                key={`${item.ingredientId}-${index}`}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-2.5 shadow-2xs transition-all ${
                  isBase
                    ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50/20 dark:bg-amber-950/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Top Row: Title, percent, delete */}
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {localizedName}
                      </span>
                      {isBase && (
                        <span className="text-[9px] font-medium text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.2 rounded shrink-0">
                          {t.baseBadge}
                        </span>
                      )}
                      {ing.isCustom && (
                        <span className="text-[9px] font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-1.5 py-0.2 rounded shrink-0 border border-indigo-200/60 dark:border-indigo-800/60">
                          {t.customBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                      {percent.toFixed(1)}%
                    </span>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      title={t.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Row: Micro specs & Tactile Touch Stepper */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {/* Micro specs */}
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    {ing.fat > 0 && <span>{t.shortFat}:{ing.fat}%</span>}
                    {ing.sugars > 0 && <span>{t.shortSugars}:{ing.sugars}%</span>}
                    {ing.pod > 0 && <span>POD:{ing.pod}</span>}
                    {ing.pac > 0 && <span>PAC:{ing.pac}</span>}
                  </div>

                  {/* Tactile Touch Stepper: [-10] [ 550 г ] [+10] */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateWeight(index, Math.max(0, item.weight - 10))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs transition-all"
                      title="-10"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => onUpdateWeight(index, Math.max(0, item.weight - 1))}
                      className="w-6 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 text-slate-700 dark:text-slate-300 font-mono text-xs transition-all"
                      title="-1"
                    >
                      -1
                    </button>

                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.weight === 0 ? '' : item.weight}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          onUpdateWeight(index, isNaN(val) ? 0 : val);
                        }}
                        className="w-16 h-7 text-center font-mono font-bold text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-800 dark:focus:border-slate-300"
                      />
                      <span className="absolute right-1 top-1.5 text-[9px] text-slate-400 dark:text-slate-500 pointer-events-none font-mono">
                        {t.unitGram}
                      </span>
                    </div>

                    <button
                      onClick={() => onUpdateWeight(index, item.weight + 1)}
                      className="w-6 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 text-slate-700 dark:text-slate-300 font-mono text-xs transition-all"
                      title="+1"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => onUpdateWeight(index, item.weight + 10)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs transition-all"
                      title="+10"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Bottom spacer for comfortable tapping */}
        <div className="h-6" />
      </div>

      {/* 4. Mobile Bottom Sheet / Modal: Add Ingredient */}
      {isAddSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-t border-slate-200 dark:border-slate-800">
            {/* Sheet Handle & Header */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                  {t.addIngredient}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  ({filteredIngredients.length})
                </span>
              </div>
              <button
                onClick={() => setIsAddSheetOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>

              {/* Category Segmented Scroller */}
              <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-0.5 custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Ingredients */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-1 max-h-72 custom-scrollbar">
              {filteredIngredients.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  {t.noResults}
                </div>
              ) : (
                filteredIngredients.map((ing) => (
                  <button
                    key={ing.id}
                    onClick={() => {
                      onAddItem(ing.id, 50);
                      setIsAddSheetOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {getLocalizedIngredientName(ing, lang)}
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      <span>{t.shortFat}: {ing.fat}%</span> · <span>POD: {ing.pod}</span> · <span>PAC: {ing.pac}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Bottom button: Add Custom Ingredient */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <button
                onClick={() => {
                  setIsAddSheetOpen(false);
                  onOpenCustomModal();
                }}
                className="w-full py-2 text-xs font-semibold text-center text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs"
              >
                {t.createCustomProduct}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile Notes Modal */}
      {isNotesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-4 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                {t.notesTitle}
              </h3>
              <button
                onClick={() => setIsNotesOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={5}
              placeholder={t.notesPlaceholder}
              value={localizedInstructions || ''}
              onChange={(e) => onUpdateInstructions(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-slate-800 dark:focus:border-slate-300"
            />
            <button
              onClick={() => setIsNotesOpen(false)}
              className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg"
            >
              {t.done}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

