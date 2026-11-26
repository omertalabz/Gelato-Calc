export type IngredientCategory =
  | 'dairy'
  | 'sugars'
  | 'fats'
  | 'stabilizers'
  | 'fruits'
  | 'pastes'
  | 'eggs'
  | 'chocolate'
  | 'other';

export interface Ingredient {
  id: string;
  name: string;
  nameIt?: string;
  names?: Record<string, string>;
  category: IngredientCategory;
  fat: number; // Жирность % (0-100)
  snf: number; // СОМО / MSNF % (0-100)
  sugars: number; // Сахара % (0-100)
  otherSolids: number; // Прочие сухие % (0-100)
  totalSolids: number; // Сухие вещества % (0-100)
  water: number; // Вода % (0-100)
  pod: number; // Коэффициент сладости relative to sucrose = 100
  pac: number; // Коэффициент антизамерзания relative to sucrose = 100
  alcohol?: number; // Спирт % (0-100)
  notes?: string;
  notesLang?: Record<string, string>;
  isCustom?: boolean;
}

export interface RecipeItem {
  ingredientId: string;
  weight: number; // Вес в граммах
}

export interface TargetProfile {
  id: string;
  name: string;
  names?: Record<string, string>;
  description: string;
  descriptions?: Record<string, string>;
  fat: [number, number]; // [min, max]
  snf: [number, number]; // [min, max]
  sugars: [number, number]; // [min, max]
  otherSolids: [number, number]; // [min, max]
  totalSolids: [number, number]; // [min, max]
  pod: [number, number]; // [min, max]
  pac: [number, number]; // [min, max]
  targetTemp: number; // Рекомендуемая температура витрины, °C (e.g. -11)
}

export interface RecipeTotals {
  totalWeight: number; // Общий вес, г
  fatWeight: number;
  snfWeight: number;
  sugarsWeight: number;
  otherSolidsWeight: number;
  totalSolidsWeight: number;
  waterWeight: number;
  podPoints: number;
  pacPoints: number;

  // Проценты от общего веса
  fatPercent: number;
  snfPercent: number;
  sugarsPercent: number;
  otherSolidsPercent: number;
  totalSolidsPercent: number;
  waterPercent: number;

  // Итоговые коэффициенты
  podTotal: number; // Суммарная сладость рецепта
  pacTotal: number; // Суммарный PAC рецепта
  
  // Расчётные показатели заморозки
  freezingPoint: number; // Расчётная начальная точка кристаллизации, °C
  frozenWaterAtMinus11: number; // % замороженной воды при -11°C
  frozenWaterAtMinus12: number; // % замороженной воды при -12°C
  frozenWaterAtMinus14: number; // % замороженной воды при -14°C
  
  // Проверка насыщения лактозы (риск песчанистости)
  lactoseRatio: number; // Отношение СОМО к Воде (критический предел ~0.165 или 16.5%)
  isLactoseRisk: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  names?: Record<string, string>;
  isCustomName?: boolean;
  profileId: string;
  items: RecipeItem[];
  instructions?: string;
  instructionsLang?: Record<string, string>;
  isCustomInstructions?: boolean;
  notes?: string;
  notesLang?: Record<string, string>;
  updatedAt: number;
}
