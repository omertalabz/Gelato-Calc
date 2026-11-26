import React from 'react';
import { BookOpen, X, AlertTriangle } from 'lucide-react';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  t?: Translations;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  lang = 'ru',
  t = TRANSLATIONS[lang],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.glossaryModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.glossaryModalSubtitle}
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed custom-scrollbar">
          {lang === 'en' && (
            <>
              {/* 1. FAT */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  1. Butterfat & Vegetal Fats (Fat / Grassi)
                </h4>
                <p>
                  Fats provide silky mouthfeel, trap air bubbles during batch freezing (overrun 25–40%), and slow melting on the palate, releasing aroma volatiles.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Milk Gelato:</strong> standard 6% – 10% (optimal 7–8%). Sources: whole milk 3.5% and fresh cream 35%.</li>
                  <li><strong>Nut Gelato:</strong> 8% – 13% fats. 100% hazelnut/pistachio paste contains ~55–65% natural oil, so dairy cream is reduced to maintain emulsion stability.</li>
                  <li><strong>Fruit Sorbets:</strong> 0% – 1% (water-based, free of dairy fats).</li>
                </ul>
              </section>

              {/* 2. POD */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                  2. Sweetness Index (POD — Potere Dolcificante)
                </h4>
                <p>
                  POD measures sweetness relative to <strong>sucrose (granulated white sugar)</strong>, defined as <strong>100</strong>. Ideal cumulative sweetness index for gelato: <strong>16 – 20</strong> (fruit sorbets: 18 – 23).
                </p>
                <div className="overflow-x-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="pb-1">Sugar / Sweetener</th>
                        <th className="pb-1 text-right">POD (Sweetness)</th>
                        <th className="pb-1 text-right">PAC (Anti-Freezing)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <tr><td className="py-1">Sucrose (Granulated sugar)</td><td className="text-right">100</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Dextrose monohydrate</td><td className="text-right">70</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Atomized glucose 38 DE</td><td className="text-right">40</td><td className="text-right">75</td></tr>
                      <tr><td className="py-1">Invert sugar (72%)</td><td className="text-right">130</td><td className="text-right">190</td></tr>
                      <tr><td className="py-1">Fructose</td><td className="text-right font-bold text-indigo-600 dark:text-indigo-400">140 – 170</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Lactose (in milk and SMP)</td><td className="text-right">16</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Trehalose</td><td className="text-right">45</td><td className="text-right">100</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. PAC */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block"></span>
                  3. Freezing Point Depression and PAC (Potere Anti-Congelante)
                </h4>
                <p>
                  PAC measures the cryoscopic power of dissolved molecules to depress the freezing point of water (Raoult's Law). Smaller molecular weight means more dissolved molecules per gram, causing stronger freezing point depression.
                </p>
                <p>
                  Dextrose molar mass is 180 g/mol, compared to sucrose at 342 g/mol. Consequently, <strong>dextrose possesses 1.9x the anti-freezing power of sugar</strong>, making gelato scoopable at -14°C without making it too sweet!
                </p>
                <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800 rounded-xl space-y-1 text-cyan-950 dark:text-cyan-200">
                  <div className="font-semibold text-xs">Display Case Balancing Rule (-11°C .. -12°C):</div>
                  <div>Target cumulative mix PAC should range between <strong>25 – 29</strong> (for sorbets <strong>28 – 34</strong>). This guarantees that exactly 72–78% of the water is frozen at showcase temperature, allowing graceful paddle waves (spatolabilità).</div>
                </div>
              </section>

              {/* 4. MSNF */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  4. MSNF / SNF and Lactose Crystallization Risk (Sabbiatura)
                </h4>
                <p>
                  <strong>MSNF</strong> (Milk Solids Non-Fat) includes milk proteins (casein, whey albumin), lactose, and minerals. Proteins bind free water and stabilize the emulsion structure.
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Danger of Sandiness (Sabbiatura):
                  </div>
                  <p>
                    Lactose has poor solubility in cold water. If MSNF exceeds <strong>16.5% of total water in the mix</strong>, lactose crystals will grow in the display case within 24–48 hours, causing an unpleasantly gritty, sandy sensation on the tongue.
                  </p>
                </div>
              </section>
            </>
          )}

          {lang === 'it' && (
            <>
              {/* 1. GRASSI */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  1. Grassi Nobili (Grassi / Lipidi)
                </h4>
                <p>
                  I grassi conferiscono setosità e cremosità alla struttura, intrappolano le microbolle d’aria durante la mantecazione (overrun 25–40%) e rallentano lo scioglimento in bocca, esaltando gli aromi.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Gelato al Latte:</strong> standard 6% – 10% (ottimale 7–8%). Fonti: latte intero fresco 3.5% e panna fresca 35%.</li>
                  <li><strong>Gelato alla Frutta Secca:</strong> 8% – 13% grassi. La pasta pura di nocciola/pistacchio contiene il 55–65% di olio vegetale, per cui la panna nella base bianca va ridotta.</li>
                  <li><strong>Sorbetti alla Frutta:</strong> 0% – 1% (a base acqua, senza grassi del latte).</li>
                </ul>
              </section>

              {/* 2. POD */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                  2. Potere Dolcificante (POD — Potere Dolcificante)
                </h4>
                <p>
                  Il POD misura la percezione della dolcezza rispetto al <strong>saccarosio (zucchero semolato)</strong>, posto convenzionalmente a <strong>100</strong>. Indice di dolcezza ottimale per gelato: <strong>16 – 20</strong> (sorbetti: 18 – 23).
                </p>
                <div className="overflow-x-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="pb-1">Zucchero</th>
                        <th className="pb-1 text-right">POD (Dolcezza)</th>
                        <th className="pb-1 text-right">PAC (Anticongelante)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <tr><td className="py-1">Saccarosio (Zucchero semolato)</td><td className="text-right">100</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Destrosio monoidrato</td><td className="text-right">70</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Glucosio atomizzato 38 DE</td><td className="text-right">40</td><td className="text-right">75</td></tr>
                      <tr><td className="py-1">Zucchero invertito (72%)</td><td className="text-right">130</td><td className="text-right">190</td></tr>
                      <tr><td className="py-1">Fruttosio</td><td className="text-right font-bold text-indigo-600 dark:text-indigo-400">140 – 170</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Lattosio (nel latte e SMP)</td><td className="text-right">16</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Trealosio</td><td className="text-right">45</td><td className="text-right">100</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. PAC */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block"></span>
                  3. Punto di Congelamento e PAC (Potere Anti-Congelante)
                </h4>
                <p>
                  Il PAC misura la capacità di abbassare il punto di congelamento dell’acqua (Legge di Raoult). Minore è la massa molecolare dello zucchero, maggiore è il numero di molecole disciolte in acqua e più forte è l’effetto anticongelante.
                </p>
                <p>
                  La massa molare del destrosio è 180 g/mol contro 342 g/mol del saccarosio. Dunque <strong>il destrosio ha un potere anticongelante 1.9 volte superiore al saccarosio</strong>, donando morbidezza anche a basse temperature senza eccesso di dolcezza!
                </p>
                <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800 rounded-xl space-y-1 text-cyan-950 dark:text-cyan-200">
                  <div className="font-semibold text-xs">Regola di Bilanciamento per Vetrina (-11°C .. -12°C):</div>
                  <div>Il PAC totale della miscela deve posizionarsi tra <strong>25 – 29</strong> (per i sorbetti <strong>28 – 34</strong>). In questo modo alla temperatura di vetrina si congela esattamente il 72–78% dell’acqua, garantendo una spatolatura impeccabile.</div>
                </div>
              </section>

              {/* 4. SLNG */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  4. SLNG (Solidi Magri del Latte) e Rischio Sabbiatura
                </h4>
                <p>
                  I <strong>SLNG</strong> (Solidi del Latte Non Grassi) comprendono proteine nobili (caseine, sieroproteine), lattosio e sali minerali. Le proteine legano l’acqua libera ed emulsionano la struttura.
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Pericolo Sabbiatura (Sabbiatura):
                  </div>
                  <p>
                    Il lattosio ha scarsa solubilità a freddo. Se i SLNG superano il <strong>16.5% dell’acqua libera nella miscela</strong>, dopo 24–48 ore in vetrina i cristalli di lattosio precipitano e si ingrossano, conferendo una sgradevole sensazione di sabbia al palato.
                  </p>
                </div>
              </section>
            </>
          )}

          {lang === 'es' && (
            <>
              {/* 1. GRASAS */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  1. Materia Grasa (Grassi / Grasas Lácteas)
                </h4>
                <p>
                  Las grasas aportan sedosidad, retienen las burbujas de aire durante el mantecado (overrun 25–40%) y retrasan el derretimiento en boca, liberando los aromas.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Helado de leche:</strong> estándar 6% – 10% (óptimo 7–8%). Fuentes: leche entera 3.5% y nata fresca 35%.</li>
                  <li><strong>Helado de frutos secos:</strong> 8% – 13% grasas. La pasta pura de avellana o pistacho aporta ~60% de grasa vegetal, por lo que se reduce la nata en la base blanca.</li>
                  <li><strong>Sorbetes de fruta:</strong> 0% – 1% (base agua, sin grasa láctea).</li>
                </ul>
              </section>

              {/* 2. POD */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                  2. Poder Edulcorante (POD — Potere Dolcificante)
                </h4>
                <p>
                  El POD mide la intensidad de dulzor relativa a la <strong>sacarosa (azúcar blanco)</strong>, fijada en <strong>100</strong>. Rango ideal de dulzor total para helado: <strong>16 – 20</strong> (sorbetes: 18 – 23).
                </p>
                <div className="overflow-x-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="pb-1">Azúcar / Edulcorante</th>
                        <th className="pb-1 text-right">POD (Dulzor)</th>
                        <th className="pb-1 text-right">PAC (Anticongelante)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <tr><td className="py-1">Sacarosa (Azúcar blanco)</td><td className="text-right">100</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Dextrosa monohidrato</td><td className="text-right">70</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Glucosa atomizada 38 DE</td><td className="text-right">40</td><td className="text-right">75</td></tr>
                      <tr><td className="py-1">Azúcar invertido (72%)</td><td className="text-right">130</td><td className="text-right">190</td></tr>
                      <tr><td className="py-1">Fructosa</td><td className="text-right font-bold text-indigo-600 dark:text-indigo-400">140 – 170</td><td className="text-right font-bold text-cyan-700 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Lactosa (en leche y leche en polvo)</td><td className="text-right">16</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Trehalosa</td><td className="text-right">45</td><td className="text-right">100</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. PAC */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block"></span>
                  3. Poder Anticongelante y PAC (Potere Anti-Congelante)
                </h4>
                <p>
                  El PAC mide la capacidad crioscópica para descender el punto de congelación del agua (Ley de Raoult). A menor peso molecular, mayor número de moléculas disueltas y mayor efecto anticongelante.
                </p>
                <p>
                  El peso molecular de la dextrosa es 180 g/mol frente a 342 g/mol de la sacarosa. Por ello, <strong>la dextrosa tiene un poder anticongelante 1.9 veces superior al azúcar</strong>, aportando textura cremosa y espatulable sin empalagar.
                </p>
                <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800 rounded-xl space-y-1 text-cyan-950 dark:text-cyan-200">
                  <div className="font-semibold text-xs">Regla para Vitrina (-11°C .. -12°C):</div>
                  <div>El PAC objetivo del mix debe situarse entre <strong>25 – 29</strong> (para sorbetes <strong>28 – 34</strong>). Así se congela exactamente el 72–78% del agua a temperatura de vitrina, permitiendo servir con espátula fácilmente.</div>
                </div>
              </section>

              {/* 4. SLNG */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  4. SLNG (Extracto Seco Desgrasado) y Riesgo de Arenosidad
                </h4>
                <p>
                  Los <strong>SLNG</strong> (Sólidos Lácteos No Grasos) incluyen proteínas (caseína, albúmina), lactosa y sales minerales. Las proteínas retienen el agua libre y estructuran la masa.
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Peligro de Arenosidad (Sabbiatura):
                  </div>
                  <p>
                    La lactosa tiene baja solubilidad en frío. Si los SLNG superan el <strong>16.5% del agua total del mix</strong>, los cristales de lactosa crecerán tras 24–48 horas en vitrina, dando una desagradable sensación arenosa en la lengua.
                  </p>
                </div>
              </section>
            </>
          )}

          {lang === 'ru' && (
            <>
              {/* 1. ЖИРНОСТЬ */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  1. Жирность (Fat / Grassi)
                </h4>
                <p>
                  Жиры обеспечивают телу джелато шелковистость, удерживают пузырьки воздуха при фризеровании (overrun 25–40%) и замедляют таяние на языке, раскрывая ароматические молекулы.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Молочное джелато:</strong> норма 6% – 10% (оптимально 7–8%). Источники: цельное молоко 3.5% и свежие сливки 35%.</li>
                  <li><strong>Ореховое джелато:</strong> 8% – 13% жиров. 100% паста фундука содержит ~64% растительного жира, поэтому сливки в базе сокращают, чтобы смесь не расслаивалась.</li>
                  <li><strong>Сорбеты:</strong> 0% – 1% (без молочных жиров).</li>
                </ul>
              </section>

              {/* 2. КОЭФФИЦИЕНТ СЛАДОСТИ (POD) */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                  2. Коэффициент сладости (POD — Potere Dolcificante)
                </h4>
                <p>
                  POD отражает силу сладости подсластителя относительно обычной <strong>сахарозы (сахара)</strong>, принятой за <strong>100</strong>. Оптимальный суммарный индекс сладости джелато: <strong>16 – 20</strong> (сорбеты: 18 – 23).
                </p>
                <div className="overflow-x-auto bg-slate-50 dark:bg-slate-800 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="pb-1">Сахар / Подсластитель</th>
                        <th className="pb-1 text-right">POD (Сладость)</th>
                        <th className="pb-1 text-right">PAC (Антизамерзание)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      <tr><td className="py-1">Сахароза (белый сахар)</td><td className="text-right">100</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Декстроза (глюкоза моногидрат)</td><td className="text-right">70</td><td className="text-right font-bold text-cyan-800 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Сухой сироп глюкозы DE 38</td><td className="text-right">40</td><td className="text-right">75</td></tr>
                      <tr><td className="py-1">Инвертный сахар (72%)</td><td className="text-right">130</td><td className="text-right">190</td></tr>
                      <tr><td className="py-1">Фруктоза</td><td className="text-right font-bold text-indigo-700 dark:text-indigo-400">140 – 170</td><td className="text-right font-bold text-cyan-800 dark:text-cyan-400">190</td></tr>
                      <tr><td className="py-1">Лактоза (в молоке и СЗМ)</td><td className="text-right">16</td><td className="text-right">100</td></tr>
                      <tr><td className="py-1">Трегалоза</td><td className="text-right">45</td><td className="text-right">100</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. ТОЧКА ЗАМЕРЗАНИЯ И PAC */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block"></span>
                  3. Точка замерзания и PAC (Potere Anti-Congelante)
                </h4>
                <p>
                  PAC измеряет криоскопическую силу молекул (снижение точки замерзания воды). Чем меньше молярная масса молекулы сахара, тем больше её молекул растворено в воде и тем сильнее она понижает температуру кристаллизации (закон Рауля).
                </p>
                <p>
                  Молярная масса декстрозы — 180 г/моль, а сахарозы — 342 г/моль. Поэтому <strong>декстроза в 1.9 раза сильнее препятствует образованию льда</strong>, позволяя получить мягкое джелато без излишней приторности!
                </p>
                <div className="p-3 bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800 rounded-xl space-y-1 text-cyan-950 dark:text-cyan-200">
                  <div className="font-semibold text-xs">Правило витрины (-11°C .. -12°C):</div>
                  <div>Целевой суммарный PAC смеси должен быть в диапазоне <strong>25 – 29</strong> (для сорбетов <strong>28 – 34</strong>). Это гарантирует, что при -11°C заморозится ровно 72–78% воды, и джелато будет идеально ложиться волной на лопатку (spatola).</div>
                </div>
              </section>

              {/* 4. СОМО И ПЕСЧАНИСТОСТЬ */}
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  4. СОМО (MSNF) и предел кристаллизации лактозы
                </h4>
                <p>
                  <strong>СОМО</strong> (Сухой Обезжиренный Молочный Остаток) — это молочные белки (казеин, альбумин), лактоза и минеральные соли. Белки связывают свободную воду и формируют структуру.
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Опасность песчанистости (Sabbiatura):
                  </div>
                  <p>
                    Лактоза плохо растворима в холодной воде. Если СОМО превышает <strong>16.5% от массы воды в смеси</strong>, через 24–48 часов в витрине кристаллы лактозы начнут укрупняться, и джелато приобретет ощущение песка на языке.
                  </p>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-500 rounded-lg shadow-2xs"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
