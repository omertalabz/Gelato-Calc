import React, { useState } from 'react';
import { Ingredient, IngredientCategory } from '../types/gelato';
import { Plus, Search, Trash2, Tag, BookOpen, Layers } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';
import { getLocalizedIngredientName, getLocalizedIngredientNotes } from '../i18n/localizedData';

interface IngredientsManagerProps {
  ingredients: Ingredient[];
  onOpenAddModal: () => void;
  onDeleteCustom: (id: string) => void;
  lang?: Language;
  t?: Translations;
}

export const IngredientsManager: React.FC<IngredientsManagerProps> = ({
  ingredients,
  onOpenAddModal,
  onDeleteCustom,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'dairy', label: t.catDairy },
    { id: 'sugars', label: t.catSugars },
    { id: 'pastes', label: t.catPastes },
    { id: 'chocolate', label: t.catChocolate },
    { id: 'fruits', label: t.catFruits },
    { id: 'eggs', label: t.catEggs },
    { id: 'stabilizers', label: t.catStabilizers },
  ];

  const filtered = ingredients.filter((ing) => {
    const locName = getLocalizedIngredientName(ing, lang).toLowerCase();
    const locNote = (getLocalizedIngredientNotes(ing, lang) || '').toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch =
      locName.includes(q) ||
      locNote.includes(q) ||
      ing.name.toLowerCase().includes(q) ||
      (ing.nameIt && ing.nameIt.toLowerCase().includes(q)) ||
      (ing.notes && ing.notes.toLowerCase().includes(q));

    const matchesCategory = selectedCategory === 'all' || ing.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top action & search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.tabIngredients} & POD / PAC
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.glossaryDesc}
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.createCustomProduct}
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-2xs focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
          />
        </div>

        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-slate-900 dark:bg-amber-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Touch Cards View (sm:hidden) */}
      <div className="sm:hidden space-y-2">
        {filtered.map((ing) => (
          <div
            key={ing.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs space-y-2 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                  {getLocalizedIngredientName(ing, lang)}
                </div>
                {ing.isCustom && (
                  <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded font-mono">
                    {t.customBadge}
                  </span>
                )}
              </div>
              {ing.isCustom && (
                <button
                  onClick={() => {
                    if (window.confirm(t.managerDeleteConfirm)) {
                      onDeleteCustom(ing.id);
                    }
                  }}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title={t.delete}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
              <div>
                <div className="text-slate-400 text-[9px]">{t.shortFat}</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{ing.fat}%</div>
              </div>
              <div>
                <div className="text-slate-400 text-[9px]">{t.shortSugars}</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{ing.sugars}%</div>
              </div>
              <div>
                <div className="text-slate-400 text-[9px]">POD</div>
                <div className="font-bold text-amber-900 dark:text-amber-400">{ing.pod}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[9px]">PAC</div>
                <div className="font-bold text-cyan-900 dark:text-cyan-400">{ing.pac}</div>
              </div>
            </div>

            {getLocalizedIngredientNotes(ing, lang) && (
              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {getLocalizedIngredientNotes(ing, lang)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Ingredients Grid Table (hidden on mobile) */}
      <div className="hidden sm:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold select-none">
                <th className="py-3 px-4">{t.ingredient}</th>
                <th className="py-3 px-3 text-right">{t.shortFat}</th>
                <th className="py-3 px-3 text-right">{t.shortSnf}</th>
                <th className="py-3 px-3 text-right">{t.shortSugars}</th>
                <th className="py-3 px-3 text-right">{t.shortOtherSolids}</th>
                <th className="py-3 px-3 text-right font-bold text-slate-900 dark:text-slate-100">{t.shortTotalSolids}</th>
                <th className="py-3 px-3 text-right text-indigo-800 dark:text-indigo-400">POD</th>
                <th className="py-3 px-3 text-right text-cyan-800 dark:text-cyan-400">PAC</th>
                <th className="py-3 px-4">{t.notes}</th>
                <th className="py-3 px-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((ing) => (
                <tr key={ing.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="py-2.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {getLocalizedIngredientName(ing, lang)}
                    </div>
                    {ing.isCustom && (
                      <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded font-mono">
                        {t.customBadge}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {ing.fat > 0 ? `${ing.fat.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {ing.snf > 0 ? `${ing.snf.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {ing.sugars > 0 ? `${ing.sugars.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                    {ing.otherSolids > 0 ? `${ing.otherSolids.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-950 dark:text-white tabular-nums">
                    {ing.totalSolids.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-800 dark:text-indigo-400 tabular-nums">
                    {ing.pod > 0 ? ing.pod.toFixed(1) : '0'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-cyan-800 dark:text-cyan-400 tabular-nums">
                    {ing.pac > 0 ? ing.pac.toFixed(1) : '0'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 text-[11px] max-w-xs truncate">
                    {getLocalizedIngredientNotes(ing, lang) || '—'}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {ing.isCustom && (
                      <button
                        onClick={() => {
                          if (window.confirm(t.managerDeleteConfirm)) {
                            onDeleteCustom(ing.id);
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title={t.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
