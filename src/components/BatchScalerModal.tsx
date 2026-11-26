import React, { useState } from 'react';
import { Scale, X, Check } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

interface BatchScalerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeight: number;
  onScale: (targetWeight: number) => void;
  lang?: Language;
  t?: Translations;
}

export const BatchScalerModal: React.FC<BatchScalerModalProps> = ({
  isOpen,
  onClose,
  currentWeight,
  onScale,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  if (!isOpen) return null;

  const [targetWeight, setTargetWeight] = useState<number>(currentWeight || 1000);

  const presets = [
    { label: t.scalerPreset1kg, value: 1000 },
    { label: t.scalerPreset2kg, value: 2000 },
    { label: t.scalerPreset3kg, value: 3000 },
    { label: t.scalerPreset4kg, value: 4000 },
    { label: t.scalerPreset5kg, value: 5000 },
  ];

  const handleApply = () => {
    if (targetWeight > 0) {
      onScale(targetWeight);
      onClose();
    }
  };

  const scaleRatio = currentWeight > 0 ? targetWeight / currentWeight : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden transition-colors">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.scalerTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.scalerDesc}
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

        <div className="p-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>{t.scalerCurrentWeight}:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                {currentWeight.toFixed(1)} {t.unitGram}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span>{t.scalerRatioLabel}:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                {scaleRatio.toFixed(3)}x
              </span>
            </div>

            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.scalerTargetWeight}:
            </label>
            <input
              type="number"
              min="1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              {t.scalerPresetsLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setTargetWeight(p.value)}
                  className={`p-2 text-left rounded-lg border text-xs transition-colors ${
                    targetWeight === p.value
                      ? 'border-slate-800 dark:border-amber-500 bg-slate-900 dark:bg-amber-600 text-white font-medium'
                      : 'border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
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
            disabled={targetWeight <= 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            {t.scalerApplyButton}
          </button>
        </div>
      </div>
    </div>
  );
};
