import React from 'react';
import { Recipe, RecipeTotals, TargetProfile, Ingredient } from '../types/gelato';
import { X, Printer } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';
import {
  getLocalizedIngredientName,
  getLocalizedIngredientNotes,
  getLocalizedProfileName,
  getLocalizedRecipeName,
  getLocalizedRecipeInstructions,
} from '../i18n/localizedData';

interface PrintTechCardProps {
  recipe: Recipe;
  totals: RecipeTotals;
  profile: TargetProfile;
  ingredientsMap: Map<string, Ingredient>;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const PrintTechCard: React.FC<PrintTechCardProps> = ({
  recipe,
  totals,
  profile,
  ingredientsMap,
  onClose,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  const handlePrint = () => {
    window.print();
  };

  const localeCode = lang === 'it' ? 'it-IT' : lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-US' : 'ru-RU';
  const currentDate = new Date().toLocaleDateString(localeCode);

  const localizedRecipeName = getLocalizedRecipeName(recipe, lang);
  const localizedProfileName = getLocalizedProfileName(profile, lang);
  const localizedInstructions = getLocalizedRecipeInstructions(recipe, lang);

  const chefLabel =
    lang === 'it'
      ? 'Maestro Gelatiere: __________________'
      : lang === 'es'
      ? 'Maestro Heladero: __________________'
      : lang === 'en'
      ? 'Master Gelatiere: __________________'
      : 'Шеф-джелатьере: __________________';

  const qcLabel =
    lang === 'it'
      ? 'Controllo Qualità: __________________'
      : lang === 'es'
      ? 'Control de Calidad: __________________'
      : lang === 'en'
      ? 'Quality Control: __________________'
      : 'Контроль качества: __________________';

  const defaultInstructions =
    lang === 'it'
      ? '1. Miscelare a secco le polveri (saccarosio, destrosio, latte magro, neutro).\n2. Unire latte e panna miscelando con frusta o mixer ad immersione.\n3. Pastorizzare a 85°C (alta pastorizzazione) o 65°C.\n4. Abbattere a +4°C.\n5. Lasciare maturare a +4°C per almeno 4-6 ore.\n6. Mantecare nel mantecatore discontinuo.\n7. Abbattimento rapido a -38°C per 10 minuti per stabilizzare la spatolabilità.'
      : lang === 'es'
      ? '1. Mezclar en seco los polvos (sacarosa, dextrosa, leche en polvo, estabilizante).\n2. Incorporar la leche y la nata batiendo intensamente.\n3. Pasteurizar a 85°C (o 65°C según formulación).\n4. Enfriar rápidamente a +4°C.\n5. Maduración a +4°C durante un mínimo de 4 a 6 horas.\n6. Mantecar en la máquina de helados.\n7. Abatimiento a -38°C durante 10 min para estabilizar la red cristalina.'
      : lang === 'en'
      ? '1. Dry-blend dry powders (sucrose, dextrose, skimmed milk powder, neutral stabilizer).\n2. Disperse into milk and cream with high-shear whisking.\n3. Pasteurize at 85°C with 2 min holding.\n4. Rapidly chill down to +4°C.\n5. Maturation / aging at +4°C for 4 to 6 hours for full protein hydration.\n6. Batch freeze in artisan batch cylinder.\n7. Blast freeze at -38°C for 10 minutes to stabilize ice crystals.'
      : '1. Смешать сухие компоненты (сахара, СЗМ, стабилизатор).\n2. Добавить молоко/сливки при перемешивании.\n3. Пастеризация при 85°C с выдержкой 2 мин.\n4. Быстрое охлаждение до +4°C.\n5. Созревание смеси в камере при +4°C не менее 4-6 часов.\n6. Фризерование во фризере периодического действия (выход при -7°C .. -9°C).\n7. Шоковая заморозка при -38°C на 10 минут для фиксации кристаллической решетки.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full my-8 overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Modal Top Bar (hidden in print) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-slate-700" />
            <span className="text-sm font-semibold text-slate-900">
              {t.techCard}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              {t.techCardPrintPdf}
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tech Sheet */}
        <div className="p-8 font-sans text-slate-900 print:p-0">
          <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-mono">
                {t.techCardHeader}
              </div>
              <h1 className="text-2xl font-bold font-serif text-slate-950 mt-1">
                {localizedRecipeName}
              </h1>
              <div className="text-xs text-slate-600 mt-1">
                {t.techCardCategory}: <strong>{localizedProfileName}</strong> · {t.targetTemp}: <strong>{profile.targetTemp}°C</strong>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-500">
              <div>{t.techCardDate}: {currentDate}</div>
              <div className="mt-1 font-bold text-slate-900 text-sm">
                {t.totalWeight}: {totals.totalWeight.toFixed(0)} {t.unitGram}
              </div>
            </div>
          </div>

          {/* Key Balancing Parameters Summary */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg mb-6 text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{t.fat.split(' ')[0]}</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{totals.fatPercent.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">POD</div>
              <div className="font-mono font-bold text-indigo-900 text-sm mt-0.5">{totals.podTotal.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">PAC</div>
              <div className="font-mono font-bold text-cyan-900 text-sm mt-0.5">{totals.pacTotal.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{t.freezingPoint}</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{totals.freezingPoint.toFixed(2)}°C</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{t.snf.split(' ')[0]}</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{totals.snfPercent.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{t.sugars.split(' ')[0]}</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{totals.sugarsPercent.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{t.totalSolids.split(' ')[0]}</div>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{totals.totalSolidsPercent.toFixed(1)}%</div>
            </div>
          </div>

          {/* Recipe Ingredients Table */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">
              {t.techCardIngredientsTitle}
            </h3>
            <table className="w-full text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
                  <th className="py-2 px-3 text-left">#</th>
                  <th className="py-2 px-3 text-left">{t.colIngredient}</th>
                  <th className="py-2 px-3 text-right">{t.weight}</th>
                  <th className="py-2 px-3 text-right">{t.share}</th>
                  <th className="py-2 px-3 text-left">{t.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recipe.items.map((item, idx) => {
                  const ing = ingredientsMap.get(item.ingredientId);
                  const ingName = ing ? getLocalizedIngredientName(ing, lang) : item.ingredientId;
                  const ingNote = ing ? getLocalizedIngredientNotes(ing, lang) : '';
                  const pct = totals.totalWeight > 0 ? (item.weight / totals.totalWeight) * 100 : 0;
                  return (
                    <tr key={idx}>
                      <td className="py-1.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-1.5 px-3 font-medium text-slate-900">
                        {ingName}
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono font-bold text-slate-950">
                        {item.weight.toFixed(1)} {t.unitGram}
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-600">
                        {pct.toFixed(2)}%
                      </td>
                      <td className="py-1.5 px-3 text-slate-500 text-[11px]">
                        {ingNote || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                  <td colSpan={2} className="py-2 px-3 uppercase text-slate-700">{t.techCardAverages}:</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-950 text-sm">
                    {totals.totalWeight.toFixed(1)} {t.unitGram}
                  </td>
                  <td className="py-2 px-3 text-right font-mono">100.00%</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Production Technology Steps */}
          <div className="mb-6 space-y-2 text-xs">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-700">
              {t.techCardPreparationInstructions}
            </h3>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-line leading-relaxed text-slate-800">
              {localizedInstructions || defaultInstructions}
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-200 flex justify-between text-xs text-slate-600">
            <div>{chefLabel}</div>
            <div>{qcLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
