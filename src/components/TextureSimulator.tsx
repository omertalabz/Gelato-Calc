import React, { useState } from 'react';
import { RecipeTotals } from '../types/gelato';
import { assessTexture } from '../utils/calculator';
import { Thermometer, Snowflake, Info, Check, AlertCircle } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

interface TextureSimulatorProps {
  totals: RecipeTotals;
  lang?: Language;
  t?: Translations;
}

export const TextureSimulator: React.FC<TextureSimulatorProps> = ({
  totals,
  lang = 'ru',
  t = TRANSLATIONS[lang] || TRANSLATIONS.ru,
}) => {
  const [targetTemp, setTargetTemp] = useState<number>(-14);

  const assessment = assessTexture(totals.freezingPoint, targetTemp, lang);

  // Benchmarks for standard display cases localized
  const getBenchmarks = (l: Language) => {
    switch (l) {
      case 'en':
        return [
          { label: t.targetTemp, temp: -14, note: 'Target PAC 31–33' },
          { label: 'Ventilated Case', temp: -11.5, note: 'Standard Showcase' },
          { label: 'Pozzetti Wells', temp: -10, note: 'Traditional Pozzetti' },
          { label: 'Take-Away', temp: -16, note: 'Pints & Tubs' },
        ];
      case 'it':
        return [
          { label: t.targetTemp, temp: -14, note: 'PAC Obiettivo 31–33' },
          { label: 'Vetrina Ventilata', temp: -11.5, note: 'Vetrina standard' },
          { label: 'Pozzetti', temp: -10, note: 'Pozzetti tradizionali' },
          { label: 'Asporto', temp: -16, note: 'Vaschette freezer' },
        ];
      case 'es':
        return [
          { label: t.targetTemp, temp: -14, note: 'PAC Objetivo 31–33' },
          { label: 'Vitrina Ventilada', temp: -11.5, note: 'Vitrina estándar' },
          { label: 'Pozzetti', temp: -10, note: 'Pozzetti tradicionales' },
          { label: 'Para Llevar', temp: -16, note: 'Tarrinas freezer' },
        ];
      case 'ru':
      default:
        return [
          { label: t.targetTemp, temp: -14, note: 'Целевой PAC 31–33' },
          { label: 'Витрина стандарт', temp: -11.5, note: 'Вентилируемая' },
          { label: 'Поццетти', temp: -10, note: 'Традиционные колодцы' },
          { label: 'Навынос / Пинты', temp: -16, note: 'Заморозка навынос' },
        ];
    }
  };

  const benchmarks = getBenchmarks(lang);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-colors">
        <div className="max-w-2xl">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {t.tabShowcase} & {t.freezingPoint}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.idealFrozenRange}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Temperature Slider & Controller */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  {t.tempSliderLabel}
                </span>
                <span className="text-2xl font-bold font-mono text-cyan-900 dark:text-cyan-300 tabular-nums">
                  {targetTemp > 0 ? `+${targetTemp}` : targetTemp}°C
                </span>
              </div>

              <input
                type="range"
                min="-18"
                max="-6"
                step="0.5"
                value={targetTemp}
                onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-amber-500"
              />

              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                <span>-18°C</span>
                <span>-11.5°C</span>
                <span>-6°C</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {benchmarks.map((b) => (
                  <button
                    key={b.temp}
                    onClick={() => setTargetTemp(b.temp)}
                    className={`p-2 text-left rounded-lg border text-xs transition-colors ${
                      Math.abs(targetTemp - b.temp) < 0.3
                        ? 'border-slate-800 dark:border-amber-500 bg-white dark:bg-slate-700 font-medium text-slate-950 dark:text-white shadow-2xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-mono font-semibold">{b.temp}°C</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{b.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Card */}
            <div className={`p-4 rounded-xl border ${assessment.color} border-slate-200/60 dark:border-slate-800/80`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {assessment.status === 'ideal' ? (
                    <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {assessment.label}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed opacity-90 text-slate-700 dark:text-slate-300">
                    {assessment.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ice / Liquid Phase Split */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-colors">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                {t.phaseState} {targetTemp}°C
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-300">{t.frozenWater}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {assessment.frozenWater.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-600 dark:bg-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, assessment.frozenWater)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-300">{t.liquidSyrup}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {(100 - assessment.frozenWater).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(0, 100 - assessment.frozenWater)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-lg space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{t.crystallizationStart}:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {totals.freezingPoint.toFixed(2)}°C
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>PAC {t.totalWeight.split(' ')[0]}:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {totals.pacTotal.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>PAC / {t.water}:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {totals.waterWeight > 0 ? (totals.pacPoints / totals.waterWeight).toFixed(3) : '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 leading-tight">
              {t.idealFrozenRange}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
