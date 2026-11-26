import React from 'react';
import { RecipeTotals, TargetProfile } from '../types/gelato';
import { getStatus, getStatusColor, getStatusText } from '../utils/calculator';
import { Wand2, CheckCircle2, AlertTriangle, Info, ThermometerSnowflake, Droplets, Sparkles } from 'lucide-react';
import { Language, Translations } from '../i18n/translations';
import { getLocalizedProfileName } from '../i18n/localizedData';

interface MobileBalanceViewProps {
  totals: RecipeTotals;
  profile: TargetProfile;
  onOpenSugarSolver: () => void;
  onOpenSimulator: () => void;
  lang?: Language;
  t: Translations;
}

export const MobileBalanceView: React.FC<MobileBalanceViewProps> = ({
  totals,
  profile,
  onOpenSugarSolver,
  onOpenSimulator,
  lang = 'ru',
  t,
}) => {
  const fatStatus = getStatus(totals.fatPercent, profile.fat);
  const sugarsStatus = getStatus(totals.sugarsPercent, profile.sugars);
  const snfStatus = getStatus(totals.snfPercent, profile.snf);
  const tsStatus = getStatus(totals.totalSolidsPercent, profile.totalSolids);
  const podStatus = getStatus(totals.podTotal, profile.pod);
  const pacStatus = getStatus(totals.pacTotal, profile.pac);

  const isAllIdeal =
    fatStatus === 'ideal' &&
    podStatus === 'ideal' &&
    pacStatus === 'ideal' &&
    snfStatus === 'ideal' &&
    tsStatus === 'ideal';

  const localizedStatusText = (status: 'low' | 'ideal' | 'high') => {
    if (status === 'ideal') return t.statusIdeal;
    if (status === 'low') return t.statusLow;
    return t.statusHigh;
  };

  const localizedProfileName = getLocalizedProfileName(profile, lang);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F9FA] dark:bg-slate-950 transition-colors">
      {/* Top Fixed Header */}
      <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-serif">
            {t.tabBalance} & {t.targetZone}
          </h2>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.profileTitle}: <span className="font-semibold text-amber-800 dark:text-amber-400">{localizedProfileName}</span> ({profile.targetTemp}°C)
          </div>
        </div>

        <button
          onClick={onOpenSugarSolver}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 rounded-lg shadow-2xs active:scale-95 transition-transform"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>{t.sugarSolver}</span>
        </button>
      </div>

      {/* Scrollable Content inside fixed viewport */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-3 custom-scrollbar">
        {/* Status Verdict Banner */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isAllIdeal
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
          }`}
        >
          {isAllIdeal ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            {isAllIdeal ? (
              <div>
                <strong>{t.balancedVerdict}</strong>
              </div>
            ) : (
              <div>
                <strong>{t.unbalancedVerdict}</strong>{' '}
                {pacStatus === 'low' && t.pacLowAdvice}
                {pacStatus === 'high' && t.pacHighAdvice}
                {podStatus === 'high' && t.podHighAdvice}
                {t.clickAutoBalance}
              </div>
            )}
          </div>
        </div>

        {/* 1. Primary Three Metrics Grid (Жирность, POD, PAC) */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.targetZone}
          </div>

          {/* ЖИРНОСТЬ */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.fat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(fatStatus)}`}>
                {localizedStatusText(fatStatus)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
                {totals.fatPercent.toFixed(1)}%
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {profile.fat[0]}% – {profile.fat[1]}%
              </span>
            </div>
            {/* Visual range bar */}
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300 bg-amber-500"
                style={{ width: `${Math.min(100, (totals.fatPercent / 20) * 100)}%` }}
              />
            </div>
          </div>

          {/* СЛАДОСТЬ POD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.pod}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(podStatus)}`}>
                {localizedStatusText(podStatus)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono text-amber-950 dark:text-amber-300 tabular-nums">
                {totals.podTotal.toFixed(1)}
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {profile.pod[0]} – {profile.pod[1]}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300 bg-amber-600 dark:bg-amber-500"
                style={{ width: `${Math.min(100, (totals.podTotal / 30) * 100)}%` }}
              />
            </div>
          </div>

          {/* АНТИЗАМЕРЗАНИЕ PAC */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{t.pac}</span>
                <span className="text-[10px] text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-1 rounded">
                  {profile.targetTemp}°C
                </span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${getStatusColor(pacStatus)}`}>
                {localizedStatusText(pacStatus)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono text-cyan-950 dark:text-cyan-300 tabular-nums">
                {totals.pacTotal.toFixed(1)}
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {profile.pac[0]} – {profile.pac[1]}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300 bg-cyan-600 dark:bg-cyan-500"
                style={{ width: `${Math.min(100, (totals.pacTotal / 40) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2. Secondary Metrics (СОМО, Сухие, Сахара) */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.totalSolids} & {t.snf}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* СОМО */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-2xs transition-colors">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.shortSnf}</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
                {totals.snfPercent.toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                {profile.snf[0]}–{profile.snf[1]}%
              </div>
            </div>

            {/* САХАРА */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-2xs transition-colors">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.shortSugars}</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
                {totals.sugarsPercent.toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                {profile.sugars[0]}–{profile.sugars[1]}%
              </div>
            </div>

            {/* СУХИЕ ВЕЩЕСТВА */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-2xs transition-colors">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.shortTotalSolids}</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
                {totals.totalSolidsPercent.toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                {profile.totalSolids[0]}–{profile.totalSolids[1]}%
              </div>
            </div>
          </div>
        </div>

        {/* 3. Криоскопия & Точка замерзания */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs flex items-center justify-between transition-colors">
          <div>
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {t.freezingPoint}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {t.crystallizationStart}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold font-mono text-cyan-900 dark:text-cyan-300 tabular-nums">
              {totals.freezingPoint.toFixed(1)}°C
            </span>
            <button
              onClick={onOpenSimulator}
              className="block text-[10px] text-cyan-700 dark:text-cyan-400 hover:underline mt-0.5"
            >
              {t.tabShowcase} →
            </button>
          </div>
        </div>

        {/* Spacer for comfortable bottom tapping */}
        <div className="h-4" />
      </div>
    </div>
  );
};

