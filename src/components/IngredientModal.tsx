import React, { useState } from 'react';
import { Ingredient, IngredientCategory } from '../types/gelato';
import { X, Check, PlusCircle } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ingredient: Ingredient) => void;
  lang?: Language;
  t?: Translations;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [nameIt, setNameIt] = useState('');
  const [category, setCategory] = useState<IngredientCategory>('dairy');
  const [fat, setFat] = useState<number>(0);
  const [snf, setSnf] = useState<number>(0);
  const [sugars, setSugars] = useState<number>(0);
  const [otherSolids, setOtherSolids] = useState<number>(0);
  const [pod, setPod] = useState<number>(0);
  const [pac, setPac] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const totalSolids = Math.round((fat + snf + sugars + otherSolids) * 100) / 100;
  const water = Math.max(0, Math.round((100 - totalSolids) * 100) / 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newIng: Ingredient = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      nameIt: nameIt.trim() || undefined,
      category,
      fat,
      snf,
      sugars,
      otherSolids,
      totalSolids,
      water,
      pod,
      pac,
      notes: notes.trim() || undefined,
      isCustom: true,
    };

    onSave(newIng);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.customModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.customModalDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.customNameLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={t.customNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.customNameItLabel}
              </label>
              <input
                type="text"
                placeholder={t.customNameItPlaceholder}
                value={nameIt}
                onChange={(e) => setNameIt(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.customCategoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IngredientCategory)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
              >
                <option value="dairy">{t.catDairy}</option>
                <option value="sugars">{t.catSugars}</option>
                <option value="pastes">{t.catPastes}</option>
                <option value="chocolate">{t.catChocolate}</option>
                <option value="fruits">{t.catFruits}</option>
                <option value="eggs">{t.catEggs}</option>
                <option value="stabilizers">{t.catStabilizers}</option>
                <option value="other">{t.catAll}</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              {t.totalSolids} (% / 100{t.unitGram})
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customFatLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={fat || ''}
                  onChange={(e) => setFat(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customSnfLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={snf || ''}
                  onChange={(e) => setSnf(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customSugarsLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={sugars || ''}
                  onChange={(e) => setSugars(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customOtherSolidsLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={otherSolids || ''}
                  onChange={(e) => setOtherSolids(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
              <div>
                {t.customTotalSolidsPreview} <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{totalSolids}%</span>
              </div>
              <div>
                {t.customWaterPreview} <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{water}%</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              {t.pod} & {t.pac}
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customPodLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={pod || ''}
                  onChange={(e) => setPod(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                  {t.customPacLabel}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={pac || ''}
                  onChange={(e) => setPac(parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 font-mono text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.customNotesLabel}
            </label>
            <textarea
              rows={2}
              placeholder="..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white rounded-lg"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg shadow-sm"
            >
              <Check className="w-4 h-4" />
              {t.customSaveButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
