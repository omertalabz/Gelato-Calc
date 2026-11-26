import React from 'react';
import { ChefHat, Gauge, Snowflake, Sliders, BookMarked } from 'lucide-react';
import { Translations } from '../i18n/translations';

export type MobileTab = 'recipe' | 'balance' | 'simulator' | 'tools' | 'ingredients';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  balanceStatus?: 'ideal' | 'warning' | 'alert';
  t: Translations;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  balanceStatus = 'ideal',
  t,
}) => {
  const tabs = [
    {
      id: 'recipe' as MobileTab,
      label: t.tabRecipe,
      icon: ChefHat,
    },
    {
      id: 'balance' as MobileTab,
      label: t.tabBalance,
      icon: Gauge,
      badge: balanceStatus !== 'ideal',
    },
    {
      id: 'simulator' as MobileTab,
      label: t.tabShowcase,
      icon: Snowflake,
    },
    {
      id: 'tools' as MobileTab,
      label: t.tabTools,
      icon: Sliders,
    },
    {
      id: 'ingredients' as MobileTab,
      label: t.tabIngredients,
      icon: BookMarked,
    },
  ];

  return (
    <nav className="shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)] transition-colors">
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto items-stretch">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center relative min-h-[44px] transition-colors ${
                isActive
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-normal'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive
                      ? 'scale-110 text-slate-900 dark:text-white stroke-[2.2]'
                      : 'text-slate-400 dark:text-slate-500 stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 leading-none tracking-tight ${
                  isActive ? 'text-slate-950 dark:text-white font-semibold' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 bg-slate-900 dark:bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

