import { Ingredient, RecipeItem, RecipeTotals, TargetProfile } from '../types/gelato';
import { Language } from '../i18n/translations';

export function calculateRecipeTotals(
  items: RecipeItem[],
  ingredientsMap: Map<string, Ingredient>
): RecipeTotals {
  let totalWeight = 0;
  let fatWeight = 0;
  let snfWeight = 0;
  let sugarsWeight = 0;
  let otherSolidsWeight = 0;
  let totalSolidsWeight = 0;
  let waterWeight = 0;
  let podPoints = 0;
  let pacPoints = 0;

  for (const item of items) {
    if (item.weight <= 0) continue;
    const ing = ingredientsMap.get(item.ingredientId);
    if (!ing) continue;

    const w = item.weight;
    totalWeight += w;

    const f = (w * ing.fat) / 100;
    const s = (w * ing.snf) / 100;
    const sug = (w * ing.sugars) / 100;
    const oth = (w * ing.otherSolids) / 100;
    const ts = (w * ing.totalSolids) / 100;
    const wt = (w * ing.water) / 100;

    fatWeight += f;
    snfWeight += s;
    sugarsWeight += sug;
    otherSolidsWeight += oth;
    totalSolidsWeight += ts;
    waterWeight += wt;

    podPoints += (w * ing.pod) / 100;
    pacPoints += (w * ing.pac) / 100;
  }

  if (totalWeight === 0) {
    return {
      totalWeight: 0,
      fatWeight: 0,
      snfWeight: 0,
      sugarsWeight: 0,
      otherSolidsWeight: 0,
      totalSolidsWeight: 0,
      waterWeight: 0,
      podPoints: 0,
      pacPoints: 0,
      fatPercent: 0,
      snfPercent: 0,
      sugarsPercent: 0,
      otherSolidsPercent: 0,
      totalSolidsPercent: 0,
      waterPercent: 0,
      podTotal: 0,
      pacTotal: 0,
      freezingPoint: 0,
      frozenWaterAtMinus11: 0,
      frozenWaterAtMinus12: 0,
      frozenWaterAtMinus14: 0,
      lactoseRatio: 0,
      isLactoseRisk: false,
    };
  }

  const fatPercent = (fatWeight / totalWeight) * 100;
  const snfPercent = (snfWeight / totalWeight) * 100;
  const sugarsPercent = (sugarsWeight / totalWeight) * 100;
  const otherSolidsPercent = (otherSolidsWeight / totalWeight) * 100;
  const totalSolidsPercent = (totalSolidsWeight / totalWeight) * 100;
  const waterPercent = (waterWeight / totalWeight) * 100;

  const podTotal = (podPoints / totalWeight) * 100;
  const pacTotal = (pacPoints / totalWeight) * 100;

  // Расчёт точки кристаллизации (Freezing Point)
  // В джелато: ΔT = K * (PAC_total / Water_total)
  // Константа калибровки ~5.41
  const pacWaterRatio = waterWeight > 0 ? pacPoints / waterWeight : 0;
  const initialFp = waterWeight > 0 ? -(pacWaterRatio * 5.41) : 0;

  // Расчёт процента вымороженной воды при температурах витрины
  const calcFrozenWater = (temp: number) => {
    if (waterWeight <= 0 || temp >= initialFp) return 0;
    const absTemp = Math.abs(temp);
    const absFp = Math.abs(initialFp);
    const fraction = (1 - absFp / absTemp) * 100;
    return Math.max(0, Math.min(95, fraction));
  };

  const frozenWaterAtMinus11 = calcFrozenWater(-11);
  const frozenWaterAtMinus12 = calcFrozenWater(-12);
  const frozenWaterAtMinus14 = calcFrozenWater(-14);

  // Проверка насыщения лактозы: отношение СОМО к воде в смеси
  // Безопасный порог в традиционной рецептуре ~0.160 .. 0.165 (16.5% от массы воды)
  const lactoseRatio = waterWeight > 0 ? snfWeight / waterWeight : 0;
  const isLactoseRisk = lactoseRatio > 0.165;

  return {
    totalWeight,
    fatWeight,
    snfWeight,
    sugarsWeight,
    otherSolidsWeight,
    totalSolidsWeight,
    waterWeight,
    podPoints,
    pacPoints,
    fatPercent,
    snfPercent,
    sugarsPercent,
    otherSolidsPercent,
    totalSolidsPercent,
    waterPercent,
    podTotal,
    pacTotal,
    freezingPoint: initialFp,
    frozenWaterAtMinus11,
    frozenWaterAtMinus12,
    frozenWaterAtMinus14,
    lactoseRatio,
    isLactoseRisk,
  };
}

export type BalanceStatus = 'low' | 'ideal' | 'high';

export function getStatus(value: number, range: [number, number]): BalanceStatus {
  const [min, max] = range;
  if (value < min) return 'low';
  if (value > max) return 'high';
  return 'ideal';
}

export function getStatusColor(status: BalanceStatus): string {
  switch (status) {
    case 'ideal':
      return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    case 'low':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'high':
      return 'text-amber-700 bg-amber-50 border-amber-200';
  }
}

export function getStatusText(
  status: BalanceStatus,
  lowLabel = 'Low',
  highLabel = 'High',
  idealLabel = 'OK'
): string {
  switch (status) {
    case 'ideal':
      return idealLabel;
    case 'low':
      return lowLabel;
    case 'high':
      return highLabel;
  }
}

// Оценка консистенции / твёрдости при произвольной температуре
export interface TextureAssessment {
  frozenWater: number;
  label: string;
  description: string;
  status: 'too_soft' | 'soft' | 'ideal' | 'firm' | 'too_hard';
  color: string;
}

const TEXTURE_TEXTS: Record<
  'melted' | 'too_soft' | 'soft' | 'ideal' | 'firm' | 'too_hard',
  Record<Language, { label: string; description: string }>
> = {
  melted: {
    ru: {
      label: 'Жидкая смесь (таяние)',
      description: 'Температура выше точки начала кристаллизации, джелато полностью растает.',
    },
    en: {
      label: 'Liquid mix (melting)',
      description: 'Temperature is above the initial crystallization point; gelato will melt completely.',
    },
    it: {
      label: 'Miscela liquida (fusione)',
      description: 'Temperatura sopra il punto di congelamento, il gelato si scioglierà completamente.',
    },
    es: {
      label: 'Mezcla líquida (fusión)',
      description: 'Temperatura por encima del punto de congelación, el helado se derretirá por completo.',
    },
  },
  too_soft: {
    ru: {
      label: 'Слишком мягкое (течёт)',
      description: 'Недостаточно кристаллов льда. Джелато будет быстро оплывать на витрине и в рожке.',
    },
    en: {
      label: 'Too soft (dripping)',
      description: 'Insufficient ice crystals. Gelato will collapse rapidly in display cases and on cones.',
    },
    it: {
      label: 'Troppo morbido (cola)',
      description: 'Troppo pochi cristalli di ghiaccio. Il gelato colerà velocemente in vetrina e sul cono.',
    },
    es: {
      label: 'Demasiado blando (gotea)',
      description: 'Insuficientes cristales de hielo. El helado perderá consistencia rápidamente en vitrina.',
    },
  },
  soft: {
    ru: {
      label: 'Очень нежное / Мягкое',
      description: 'Легко накладывается, быстро тает во рту. Подходит для быстрой подачи или мягких вкусов.',
    },
    en: {
      label: 'Very delicate / Soft',
      description: 'Easy to scoop, melts quickly on the palate. Great for rapid service and softer flavours.',
    },
    it: {
      label: 'Molto delicato / Morbido',
      description: 'Facile da spatolare, fonde rapidamente al palato. Ottimo per servizio veloce o gusti morbidi.',
    },
    es: {
      label: 'Muy delicado / Blando',
      description: 'Fácil de servir, funde rápido en el paladar. Ideal para servicio rápido y sabores suaves.',
    },
  },
  ideal: {
    ru: {
      label: 'Идеальная консистенция (Cremoso)',
      description: 'Классическая итальянская текстура: шелковистая, держит форму волны на лопатке (spatola).',
    },
    en: {
      label: 'Ideal consistency (Cremoso)',
      description: 'Classic Italian artisan texture: silky, sculptable, holds a wave on the spatola.',
    },
    it: {
      label: 'Consistenza perfetta (Cremoso)',
      description: 'Struttura classica all\'italiana: setosa, tiene l\'onda perfetta sulla spatola.',
    },
    es: {
      label: 'Consistencia perfecta (Cremoso)',
      description: 'Textura clásica artesanal: sedosa, mantiene la ola perfecta en la espátula.',
    },
  },
  firm: {
    ru: {
      label: 'Плотное / Твердоватое',
      description: 'Требует небольшого усилия при наборе лопаткой. Подходит для формования в пинты/ванночки навынос.',
    },
    en: {
      label: 'Dense / Firm',
      description: 'Requires moderate effort to scoop. Suitable for take-away pints and insulated tubs.',
    },
    it: {
      label: 'Strutturato / Sodo',
      description: 'Richiede leggero sforzo con la spatola. Ideale per vaschette termiche e asporto.',
    },
    es: {
      label: 'Estructurado / Firme',
      description: 'Requiere algo de esfuerzo para servir. Adecuado para tarrinas térmicas para llevar.',
    },
  },
  too_hard: {
    ru: {
      label: 'Слишком твёрдое / Ледяное',
      description: 'Высокий процент льда. Будет крошиться и давать ощущение холода и льдинок на языке.',
    },
    en: {
      label: 'Too hard / Icy',
      description: 'Excessive ice fraction. Brittle, difficult to spatulate, feels cold and crystalline on the tongue.',
    },
    it: {
      label: 'Troppo duro / Ghiacciato',
      description: 'Quota di ghiaccio eccessiva. Friabile, difficile da spatolare, sensazione allappante e fredda.',
    },
    es: {
      label: 'Demasiado duro / Helado',
      description: 'Exceso de agua congelada. Quebradizo, difícil de servir, sensación fría y cristalina en boca.',
    },
  },
};

export function assessTexture(
  freezingPoint: number,
  temperature: number,
  lang: Language = 'ru'
): TextureAssessment {
  if (temperature >= freezingPoint) {
    const text = TEXTURE_TEXTS.melted[lang] || TEXTURE_TEXTS.melted.ru;
    return {
      frozenWater: 0,
      label: text.label,
      description: text.description,
      status: 'too_soft',
      color: 'text-rose-600 bg-rose-50',
    };
  }

  const absTemp = Math.abs(temperature);
  const absFp = Math.abs(freezingPoint);
  const frozen = Math.max(0, Math.min(96, (1 - absFp / absTemp) * 100));

  if (frozen < 68) {
    const text = TEXTURE_TEXTS.too_soft[lang] || TEXTURE_TEXTS.too_soft.ru;
    return {
      frozenWater: frozen,
      label: text.label,
      description: text.description,
      status: 'too_soft',
      color: 'text-amber-700 bg-amber-50',
    };
  } else if (frozen < 72) {
    const text = TEXTURE_TEXTS.soft[lang] || TEXTURE_TEXTS.soft.ru;
    return {
      frozenWater: frozen,
      label: text.label,
      description: text.description,
      status: 'soft',
      color: 'text-emerald-700 bg-emerald-50',
    };
  } else if (frozen <= 78) {
    const text = TEXTURE_TEXTS.ideal[lang] || TEXTURE_TEXTS.ideal.ru;
    return {
      frozenWater: frozen,
      label: text.label,
      description: text.description,
      status: 'ideal',
      color: 'text-emerald-800 bg-emerald-100',
    };
  } else if (frozen <= 82) {
    const text = TEXTURE_TEXTS.firm[lang] || TEXTURE_TEXTS.firm.ru;
    return {
      frozenWater: frozen,
      label: text.label,
      description: text.description,
      status: 'firm',
      color: 'text-blue-700 bg-blue-50',
    };
  } else {
    const text = TEXTURE_TEXTS.too_hard[lang] || TEXTURE_TEXTS.too_hard.ru;
    return {
      frozenWater: frozen,
      label: text.label,
      description: text.description,
      status: 'too_hard',
      color: 'text-slate-800 bg-slate-200',
    };
  }
}

// Масштабирование веса партии
export function scaleRecipeItems(items: RecipeItem[], currentTotal: number, newTotal: number): RecipeItem[] {
  if (currentTotal <= 0 || newTotal <= 0) return items;
  const factor = newTotal / currentTotal;
  return items.map((item) => ({
    ...item,
    weight: Math.round(item.weight * factor * 10) / 10,
  }));
}

// Солвер сахаров (Автоподбор Сахарозы и Декстрозы для достижения целевого POD и PAC)
export interface SugarSolverResult {
  sucroseGrams: number;
  dextroseGrams: number;
  achievable: boolean;
  deltaWeight: number;
}

export function solveSugars(
  currentTotals: RecipeTotals,
  currentSucroseWeight: number,
  currentDextroseWeight: number,
  targetPod: number, // например 18.0%
  targetPac: number // например 27.0%
): SugarSolverResult {
  const W = currentTotals.totalWeight;
  if (W <= 0) return { sucroseGrams: 0, dextroseGrams: 0, achievable: false, deltaWeight: 0 };

  // Вычитаем вклад текущей сахарозы и декстрозы из суммарных очков POD и PAC
  // Сахароза: POD = 100, PAC = 100
  // Декстроза: POD = 70, PAC = 190
  const otherPodPoints = currentTotals.podPoints - (currentSucroseWeight * 1.0 + currentDextroseWeight * 0.7);
  const otherPacPoints = currentTotals.pacPoints - (currentSucroseWeight * 1.0 + currentDextroseWeight * 1.9);

  // Мы хотим:
  // (otherPodPoints + S * 1.0 + D * 0.70) / W * 100 = targetPod
  // (otherPacPoints + S * 1.0 + D * 1.90) / W * 100 = targetPac
  const requiredPodPoints = (targetPod / 100) * W - otherPodPoints;
  const requiredPacPoints = (targetPac / 100) * W - otherPacPoints;

  // Система уравнений:
  // 1.0 * S + 0.70 * D = requiredPodPoints
  // 1.0 * S + 1.90 * D = requiredPacPoints
  // Вычитаем (2) - (1):
  // (1.90 - 0.70) * D = requiredPacPoints - requiredPodPoints
  // 1.20 * D = requiredPacPoints - requiredPodPoints
  const D = (requiredPacPoints - requiredPodPoints) / 1.2;
  const S = requiredPodPoints - 0.7 * D;

  const achievable = D >= 0 && S >= 0;
  const newSucrose = Math.max(0, Math.round(S));
  const newDextrose = Math.max(0, Math.round(D));
  const deltaWeight = (newSucrose + newDextrose) - (currentSucroseWeight + currentDextroseWeight);

  return {
    sucroseGrams: newSucrose,
    dextroseGrams: newDextrose,
    achievable,
    deltaWeight,
  };
}
