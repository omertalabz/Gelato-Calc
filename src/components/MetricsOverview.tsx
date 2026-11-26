import React from 'react';
import { RecipeTotals, TargetProfile } from '../types/gelato';
import { getStatus, getStatusColor, getStatusText } from '../utils/calculator';
import { AlertTriangle, CheckCircle2, Info, ThermometerSnowflake, Droplets, PieChart } from 'lucide-react';
import { Translations, TRANSLATIONS } from '../i18n/translations';

interface MetricsOverviewProps {
  totals: RecipeTotals;
  profile: TargetProfile;
  t?: Translations;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ totals, profile, t = TRANSLATIONS.ru }) => {
  const fatStatus = getStatus(totals.fatPercent, profile.fat);
  const sugarsStatus = getStatus(totals.sugarsPercent, profile.sugars);
  const snfStatus = getStatus(totals.snfPercent, profile.snf);
  const tsStatus = getStatus(totals.totalSolidsPercent, profile.totalSolids);
  const podStatus = getStatus(totals.podTotal, profile.pod);
  const pacStatus = getStatus(totals.pacTotal, profile.pac);

  const getLocalizedStatusText = (status: 'low' | 'ideal' | 'high') => {
    if (status === 'ideal') return t.statusIdeal;
    if (status === 'low') return t.statusLow;
    return t.statusHigh;
  };

  return (
    <div className="space-y-4">
      {/* Primary 3 Key Metrics: Жирность, Коэффициент сладости (POD), Точка замерзания (PAC) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. ЖИРНОСТЬ */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{t.fat}</span>
              <div className="text-xs text-slate-400 dark:text-slate-500">{t.targetZone}: {profile.fat[0]}% – {profile.fat[1]}%</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getStatusColor(fatStatus)}`}>
              {getLocalizedStatusText(fatStatus)}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
              {totals.fatPercent.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              ({totals.fatWeight.toFixed(1)} {t.unitGram})
            </span>
          </div>

          {/* Visual progress bar within target min/max */}
          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              {/* Target zone highlight */}
              <div
                className="absolute top-0 bottom-0 bg-emerald-100 dark:bg-emerald-950/70 border-x border-emerald-300 dark:border-emerald-700"
                style={{
                  left: `${Math.min(100, (profile.fat[0] / 20) * 100)}%`,
                  width: `${Math.max(4, ((profile.fat[1] - profile.fat[0]) / 20) * 100)}%`,
                }}
              />
              {/* Value indicator marker */}
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  fatStatus === 'ideal' ? 'bg-emerald-600' : fatStatus === 'low' ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (totals.fatPercent / 20) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>0%</span>
              <span>{t.targetZone} {profile.fat[0]}–{profile.fat[1]}%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* 2. КОЭФФИЦИЕНТ СЛАДОСТИ (POD) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{t.pod}</span>
              <div className="text-xs text-slate-400 dark:text-slate-500">{t.targetZone}: {profile.pod[0]} – {profile.pod[1]}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getStatusColor(podStatus)}`}>
              {getLocalizedStatusText(podStatus)}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
              {totals.podTotal.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t.podIndexDesc}
            </span>
          </div>

          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 bg-emerald-100 dark:bg-emerald-950/70 border-x border-emerald-300 dark:border-emerald-700"
                style={{
                  left: `${Math.min(100, (profile.pod[0] / 30) * 100)}%`,
                  width: `${Math.max(4, ((profile.pod[1] - profile.pod[0]) / 30) * 100)}%`,
                }}
              />
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  podStatus === 'ideal' ? 'bg-emerald-600' : podStatus === 'low' ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (totals.podTotal / 30) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>0</span>
              <span>{t.targetZone} {profile.pod[0]}–{profile.pod[1]}</span>
              <span>30</span>
            </div>
          </div>
        </div>

        {/* 3. ТОЧКА ЗАМЕРЗАНИЯ & PAC */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{t.pac}</span>
              <div className="text-xs text-slate-400 dark:text-slate-500">{t.targetZone}: {profile.pac[0]} – {profile.pac[1]}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getStatusColor(pacStatus)}`}>
              {getLocalizedStatusText(pacStatus)}
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
                {totals.pacTotal.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5 font-mono">
                PAC
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-semibold font-mono text-cyan-800 dark:text-cyan-400 tabular-nums">
                {totals.freezingPoint.toFixed(2)}°C
              </span>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {t.crystallizationStart}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 bg-emerald-100 dark:bg-emerald-950/70 border-x border-emerald-300 dark:border-emerald-700"
                style={{
                  left: `${Math.min(100, (profile.pac[0] / 45) * 100)}%`,
                  width: `${Math.max(4, ((profile.pac[1] - profile.pac[0]) / 45) * 100)}%`,
                }}
              />
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  pacStatus === 'ideal' ? 'bg-emerald-600' : pacStatus === 'low' ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (totals.pacTotal / 45) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>0</span>
              <span>{t.targetZone} {profile.pac[0]}–{profile.pac[1]}</span>
              <span>45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Balance Row: СОМО (MSNF), Сахара, Сухие вещества, Вода */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* СОМО / MSNF */}
        <div className={`p-3 bg-white dark:bg-slate-900 border rounded-xl shadow-xs transition-colors ${totals.isLactoseRisk ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.snf}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(snfStatus)}`}>
              {totals.snfPercent.toFixed(1)}%
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totals.snfWeight.toFixed(1)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{t.unitGram}</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {t.targetZone}: {profile.snf[0]}–{profile.snf[1]}%
          </div>
          {totals.isLactoseRisk && (
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-amber-800 dark:text-amber-400">
              <AlertTriangle className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{t.simulatorLactoseWarning}</span>
            </div>
          )}
        </div>

        {/* САХАРА (Sugars) */}
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.sugars}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(sugarsStatus)}`}>
              {totals.sugarsPercent.toFixed(1)}%
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totals.sugarsWeight.toFixed(1)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{t.unitGram}</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {t.targetZone}: {profile.sugars[0]}–{profile.sugars[1]}%
          </div>
        </div>

        {/* СУХИЕ ВЕЩЕСТВА (Total Solids) */}
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.totalSolids}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(tsStatus)}`}>
              {totals.totalSolidsPercent.toFixed(1)}%
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totals.totalSolidsWeight.toFixed(1)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{t.unitGram}</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {t.targetZone}: {profile.totalSolids[0]}–{profile.totalSolids[1]}%
          </div>
        </div>

        {/* ВОДА (Water) */}
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.water}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded border font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {totals.waterPercent.toFixed(1)}%
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totals.waterWeight.toFixed(1)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{t.unitGram}</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {t.phaseState} {profile.targetTemp}°C: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
              {profile.targetTemp === -14 ? totals.frozenWaterAtMinus14.toFixed(0) : totals.frozenWaterAtMinus11.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
