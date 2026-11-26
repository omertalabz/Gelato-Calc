import React, { useState } from 'react';
import { RecipeItem, RecipeTotals, TargetProfile } from '../types/gelato';
import { solveSugars } from '../utils/calculator';
import { Wand2, X, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

interface SugarSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  totals: RecipeTotals;
  profile: TargetProfile;
  items: RecipeItem[];
  onApplySugars: (sucroseGrams: number, dextroseGrams: number) => void;
  lang?: Language;
  t?: Translations;
}

export const SugarSolverModal: React.FC<SugarSolverModalProps> = ({
  isOpen,
  onClose,
  totals,
  profile,
  items,
  onApplySugars,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  if (!isOpen) return null;

  // Find current sucrose and dextrose in recipe
  const sucroseItem = items.find((i) => i.ingredientId === 'sucrose');
  const dextroseItem = items.find((i) => i.ingredientId === 'dextrose');

  const currentSucrose = sucroseItem ? sucroseItem.weight : 0;
  const currentDextrose = dextroseItem ? dextroseItem.weight : 0;

  // Default targets to profile midpoints
  const defaultTargetPod = (profile.pod[0] + profile.pod[1]) / 2;
  const defaultTargetPac = (profile.pac[0] + profile.pac[1]) / 2;

  const [targetPod, setTargetPod] = useState<number>(Math.round(defaultTargetPod * 10) / 10);
  const [targetPac, setTargetPac] = useState<number>(Math.round(defaultTargetPac * 10) / 10);

  const solution = solveSugars(totals, currentSucrose, currentDextrose, targetPod, targetPac);

  const handleApply = () => {
    onApplySugars(solution.sucroseGrams, solution.dextroseGrams);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 rounded-lg">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.solverTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.solverDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Target inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.pod}
              </label>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                {profile.pod[0]} – {profile.pod[1]}
              </div>
              <input
                type="number"
                step="0.1"
                value={targetPod}
                onChange={(e) => setTargetPod(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 font-mono text-base font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
              />
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                {t.solverCurrentPod}: {totals.podTotal.toFixed(1)}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.pac} ({profile.targetTemp}°C)
              </label>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                {profile.pac[0]} – {profile.pac[1]}
              </div>
              <input
                type="number"
                step="0.1"
                value={targetPac}
                onChange={(e) => setTargetPac(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 font-mono text-base font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
              />
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                {t.solverCurrentPac}: {totals.pacTotal.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Solution Display */}
          <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl p-4 space-y-3">
            <div className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 uppercase tracking-wide">
              {t.solverBalancedTitle}
            </div>

            {solution.achievable ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/60">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {lang === 'it' ? 'Saccarosio (POD 100 / PAC 100)' : lang === 'es' ? 'Sacarosa (POD 100 / PAC 100)' : lang === 'en' ? 'Sucrose (POD 100 / PAC 100)' : 'Сахароза (POD 100 / PAC 100)'}:
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 dark:text-slate-500">{currentSucrose} {t.unitGram}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {solution.sucroseGrams} {t.unitGram}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/60">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {lang === 'it' ? 'Destrosio (POD 70 / PAC 190)' : lang === 'es' ? 'Dextrosa (POD 70 / PAC 190)' : lang === 'en' ? 'Dextrose (POD 70 / PAC 190)' : 'Декстроза (POD 70 / PAC 190)'}:
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 dark:text-slate-500">{currentDextrose} {t.unitGram}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {solution.dextroseGrams} {t.unitGram}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 flex justify-between">
                  <span>{t.solverFormulaDesc}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  {lang === 'it'
                    ? 'La combinazione richiesta richiede valori negativi. Regola il PAC desiderato o aumenta la base neutra.'
                    : lang === 'es'
                    ? 'La combinación deseada requiere valores negativos. Ajusta el PAC objetivo.'
                    : lang === 'en'
                    ? 'Target combination cannot be achieved with only sucrose and dextrose without negative weight. Adjust PAC.'
                    : 'Указанная комбинация POD и PAC не может быть достигнута только сахарозой и декстрозой.'}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleApply}
            disabled={!solution.achievable}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            {t.apply}
          </button>
        </div>
      </div>
    </div>
  );
};
