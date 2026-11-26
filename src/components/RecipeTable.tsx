import React, { useState } from 'react';
import { Ingredient, RecipeItem, RecipeTotals, TargetProfile } from '../types/gelato';
import { Trash2, Plus, Search, HelpCircle, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';
import { getLocalizedIngredientName } from '../i18n/localizedData';

interface RecipeTableProps {
  items: RecipeItem[];
  ingredientsMap: Map<string, Ingredient>;
  allIngredients: Ingredient[];
  totals: RecipeTotals;
  profile: TargetProfile;
  onUpdateWeight: (index: number, weight: number) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: (ingredientId: string, initialWeight?: number) => void;
  onOpenCustomIngredientModal: () => void;
  lang?: Language;
  t?: Translations;
}

export const RecipeTable: React.FC<RecipeTableProps> = ({
  items,
  ingredientsMap,
  allIngredients,
  totals,
  profile,
  onUpdateWeight,
  onRemoveItem,
  onAddItem,
  onOpenCustomIngredientModal,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  // Filter available ingredients not yet in the recipe, or allow duplicates
  const filteredIngredients = allIngredients.filter((ing) => {
    const query = searchQuery.toLowerCase();
    const locName = getLocalizedIngredientName(ing, lang).toLowerCase();
    return (
      locName.includes(query) ||
      ing.name.toLowerCase().includes(query) ||
      (ing.nameIt && ing.nameIt.toLowerCase().includes(query)) ||
      ing.category.toLowerCase().includes(query)
    );
  });

  const handleAddSelected = (id: string) => {
    onAddItem(id, 50);
    setIsAddMenuOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden transition-colors">
      {/* Table Action Bar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t.tabRecipe} & {t.totalSolids}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            ({items.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Ingredient Dropdown / Search */}
          <div className="relative">
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>{t.addIngredient}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isAddMenuOpen && (
              <div className="absolute right-0 mt-1 w-80 max-h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="overflow-y-auto max-h-64 p-1 divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredIngredients.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      {t.noResults}
                    </div>
                  ) : (
                    filteredIngredients.map((ing) => (
                      <button
                        key={ing.id}
                        onClick={() => handleAddSelected(ing.id)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white">
                            {getLocalizedIngredientName(ing, lang)}
                          </div>
                        </div>
                        <div className="text-right text-[10px] text-slate-400 font-mono">
                          <span>{t.shortFat}: {ing.fat}%</span> · <span>POD: {ing.pod}</span> · <span>PAC: {ing.pac}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <button
                    onClick={() => {
                      setIsAddMenuOpen(false);
                      onOpenCustomIngredientModal();
                    }}
                    className="w-full py-1.5 px-3 text-xs text-center font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded transition-colors"
                  >
                    {t.createCustomProduct}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300 font-medium select-none">
              <th className="py-2.5 px-3 w-52 sm:w-64">{t.ingredient}</th>
              <th className="py-2.5 px-2 text-right w-24">{t.weight}</th>
              <th className="py-2.5 px-2 text-right w-16">{t.share}</th>
              <th className="py-2.5 px-2 text-right" title={t.fat}>
                {t.shortFat}
              </th>
              <th className="py-2.5 px-2 text-right" title={t.snf}>
                {t.shortSnf}
              </th>
              <th className="py-2.5 px-2 text-right" title={t.sugars}>
                {t.shortSugars}
              </th>
              <th className="py-2.5 px-2 text-right" title={t.otherSolids}>
                {t.shortOtherSolids}
              </th>
              <th className="py-2.5 px-2 text-right" title={t.totalSolids}>
                {t.shortTotalSolids}
              </th>
              <th className="py-2.5 px-2 text-right font-mono" title={t.pod}>
                POD
              </th>
              <th className="py-2.5 px-2 text-right font-mono" title={t.pac}>
                PAC
              </th>
              <th className="py-2.5 px-2 text-center w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item, index) => {
              const ing = ingredientsMap.get(item.ingredientId);
              if (!ing) return null;

              const weight = item.weight;
              const percent = totals.totalWeight > 0 ? (weight / totals.totalWeight) * 100 : 0;
              const fatGrams = (weight * ing.fat) / 100;
              const snfGrams = (weight * ing.snf) / 100;
              const sugarsGrams = (weight * ing.sugars) / 100;
              const otherGrams = (weight * ing.otherSolids) / 100;
              const tsGrams = (weight * ing.totalSolids) / 100;
              const podPoints = (weight * ing.pod) / 100;
              const pacPoints = (weight * ing.pac) / 100;

              return (
                <tr key={`${item.ingredientId}-${index}`} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors group">
                  <td className="py-2 px-3">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {getLocalizedIngredientName(ing, lang)}
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.weight === 0 ? '' : item.weight}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        onUpdateWeight(index, isNaN(val) ? 0 : val);
                      }}
                      className="w-20 px-2 py-1 text-right font-mono font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:border-slate-800 dark:focus:border-slate-300 transition-colors tabular-nums"
                    />
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                    {percent.toFixed(1)}%
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {fatGrams > 0 ? fatGrams.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {snfGrams > 0 ? snfGrams.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {sugarsGrams > 0 ? sugarsGrams.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {otherGrams > 0 ? otherGrams.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                    {tsGrams > 0 ? tsGrams.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-amber-800 dark:text-amber-400 font-medium tabular-nums">
                    {podPoints > 0 ? podPoints.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-cyan-800 dark:text-cyan-400 font-medium tabular-nums">
                    {pacPoints > 0 ? pacPoints.toFixed(1) : '—'}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="opacity-40 group-hover:opacity-100 hover:text-rose-600 dark:hover:text-rose-400 transition-opacity p-1 rounded"
                      title={t.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Totals Footer Row */}
          <tfoot>
            <tr className="bg-slate-100 dark:bg-slate-800 font-semibold border-t-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
              <td className="py-3 px-3 uppercase text-[11px] tracking-wider text-slate-600 dark:text-slate-300">
                {t.totalWeight}
              </td>
              <td className="py-3 px-2 text-right font-mono text-sm tabular-nums">
                {totals.totalWeight.toFixed(1)} g
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                100%
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums">
                <div>{totals.fatWeight.toFixed(1)} g</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {totals.fatPercent.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums">
                <div>{totals.snfWeight.toFixed(1)} g</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {totals.snfPercent.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums">
                <div>{totals.sugarsWeight.toFixed(1)} g</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {totals.sugarsPercent.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums">
                <div>{totals.otherSolidsWeight.toFixed(1)} g</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {totals.otherSolidsPercent.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-950 dark:text-white font-bold">
                <div>{totals.totalSolidsWeight.toFixed(1)} g</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                  {totals.totalSolidsPercent.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums text-amber-800 dark:text-amber-400 font-bold">
                <div>{totals.podPoints.toFixed(1)}</div>
                <div className="text-[10px] font-normal">
                  {totals.podTotal.toFixed(1)}%
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono tabular-nums text-cyan-800 dark:text-cyan-400 font-bold">
                <div>{totals.pacPoints.toFixed(1)}</div>
                <div className="text-[10px] font-normal">
                  {totals.pacTotal.toFixed(1)}
                </div>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
