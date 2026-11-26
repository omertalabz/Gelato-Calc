import { Ingredient, IngredientCategory, Recipe, TargetProfile } from '../types/gelato';
import { Language, Translations } from './translations';

export interface LocalizedText {
  ru: string;
  en: string;
  it: string;
  es: string;
}

// 1. INGREDIENTS LOCALIZATION
export const INGREDIENT_NAMES_MAP: Record<string, LocalizedText> = {
  milk_3_5: {
    ru: 'Молоко цельное 3.5%',
    en: 'Whole Milk 3.5%',
    it: 'Latte intero 3.5%',
    es: 'Leche entera 3.5%',
  },
  milk_1_5: {
    ru: 'Молоко полуобезжиренное 1.5%',
    en: 'Semi-skimmed Milk 1.5%',
    it: 'Latte parzialmente scremato 1.5%',
    es: 'Leche semidesnatada 1.5%',
  },
  cream_35: {
    ru: 'Сливки 35% животные',
    en: 'Heavy Cream 35%',
    it: 'Panna fresca 35%',
    es: 'Nata fresca 35%',
  },
  cream_38: {
    ru: 'Сливки 38%',
    en: 'Heavy Cream 38%',
    it: 'Panna fresca 38%',
    es: 'Nata fresca 38%',
  },
  smp_powder: {
    ru: 'Сухое обезжиренное молоко (СЗМ / СОМО)',
    en: 'Skimmed Milk Powder (SMP)',
    it: 'Latte magro in polvere (SMP)',
    es: 'Leche desnatada en polvo (SMP)',
  },
  wmp_powder: {
    ru: 'Сухое цельное молоко (СЦМ)',
    en: 'Whole Milk Powder (WMP)',
    it: 'Latte intero in polvere (WMP)',
    es: 'Leche entera en polvo (WMP)',
  },
  mascarpone: {
    ru: 'Маскарпоне',
    en: 'Mascarpone Cheese',
    it: 'Mascarpone fresco',
    es: 'Queso Mascarpone',
  },
  sucrose: {
    ru: 'Сахароза (Сахар белый)',
    en: 'Sucrose (Granulated Sugar)',
    it: 'Saccarosio (Zucchero semolato)',
    es: 'Sacarosa (Azúcar blanco)',
  },
  dextrose: {
    ru: 'Декстроза (Глюкоза кристаллическая)',
    en: 'Dextrose Monohydrate',
    it: 'Destrosio monoidrato',
    es: 'Dextrosa monohidrato',
  },
  atomized_glucose_38: {
    ru: 'Сухой сироп глюкозы DE 38-40',
    en: 'Atomized Glucose Powder 38-40 DE',
    it: 'Glucosio atomizzato 38-40 DE',
    es: 'Glucosa atomizada 38-40 DE',
  },
  invert_sugar: {
    ru: 'Инвертный сахар (паста 72%)',
    en: 'Invert Sugar Trimoline (72%)',
    it: 'Zucchero invertito pasta 72%',
    es: 'Azúcar invertido pasta 72%',
  },
  fructose: {
    ru: 'Фруктоза кристаллическая',
    en: 'Crystalline Fructose',
    it: 'Fruttosio cristallino',
    es: 'Fructosa cristalina',
  },
  honey: {
    ru: 'Мёд цветочный натуральный',
    en: 'Natural Flower Honey',
    it: 'Miele millefiori naturale',
    es: 'Miel natural de flores',
  },
  trehalose: {
    ru: 'Трегалоза',
    en: 'Trehalose',
    it: 'Trealosio',
    es: 'Trehalosa',
  },
  maltodextrin_19: {
    ru: 'Мальтодекстрин DE 19',
    en: 'Maltodextrin 19 DE',
    it: 'Maltodestrina 19 DE',
    es: 'Maltodextrina 19 DE',
  },
  egg_yolk: {
    ru: 'Желток куриный пастеризованный',
    en: 'Pasteurized Egg Yolk',
    it: 'Tuorlo d’uovo pastorizzato',
    es: 'Yema de huevo pasteurizada',
  },
  whole_egg: {
    ru: 'Яйцо куриное целое',
    en: 'Pasteurized Whole Egg',
    it: 'Uovo intero pastorizzato',
    es: 'Huevo entero pasteurizado',
  },
  paste_hazelnut: {
    ru: 'Паста Фундук 100% (Nocciola Piemonte)',
    en: '100% Pure Hazelnut Paste (Piedmont)',
    it: 'Pasta pura di nocciola Piemonte 100%',
    es: 'Pasta pura de avellana Piamonte 100%',
  },
  paste_pistachio: {
    ru: 'Паста Фисташка 100% (Pistacchio Puro)',
    en: '100% Pure Pistachio Paste (Sicily)',
    it: 'Pasta pura di pistacchio Sicilia 100%',
    es: 'Pasta pura de pistacho Sicilia 100%',
  },
  cocoa_powder_22: {
    ru: 'Какао-порошок алкализованный 22-24%',
    en: 'Dutch Cocoa Powder 22-24%',
    it: 'Cacao amaro in polvere 22-24%',
    es: 'Cacao puro en polvo 22-24%',
  },
  dark_chocolate_70: {
    ru: 'Шоколад темный 70%',
    en: 'Dark Chocolate 70%',
    it: 'Cioccolato fondente 70%',
    es: 'Chocolate negro 70%',
  },
  stellamix_cf_100: {
    ru: 'Stellamix C.F. 100 (Стелла микс)',
    en: 'STELLAMIX® C.F. 100 (Prodotti Stella)',
    it: 'STELLAMIX® C.F. 100 (Prodotti Stella)',
    es: 'STELLAMIX® C.F. 100 (Prodotti Stella)',
  },
  cremante_50: {
    ru: 'Cremante 50 (Креманте 50)',
    en: 'CREMANTE 50 Mix Frutta',
    it: 'CREMANTE 50 Mix Frutta',
    es: 'CREMANTE 50 Mix Fruta',
  },
  neutral_stabilizer: {
    ru: 'Стабилизатор нейтральный универсальный (5 г/кг)',
    en: 'Universal Gelato Stabilizer Neutro (5 g/kg)',
    it: 'Neutro / Stabilizzante universale (5 g/kg)',
    es: 'Estabilizante neutro universal (5 g/kg)',
  },
  strawberry_puree_10: {
    ru: 'Пюре клубники (10% сахара)',
    en: 'Strawberry Puree (10% sugar)',
    it: 'Purea di fragola zuccherata 10%',
    es: 'Puré de fresa (10% azúcar)',
  },
  raspberry_puree_10: {
    ru: 'Пюре малины (10% сахара)',
    en: 'Raspberry Puree (10% sugar)',
    it: 'Purea di lampone zuccherata 10%',
    es: 'Puré de frambuesa (10% azúcar)',
  },
  lemon_juice: {
    ru: 'Сок лимона свежевыжатый',
    en: 'Fresh Lemon Juice',
    it: 'Succo di limone fresco filtrato',
    es: 'Zumo de limón fresco',
  },
  water: {
    ru: 'Вода питьевая',
    en: 'Drinking Water',
    it: 'Acqua potabile',
    es: 'Agua potable',
  },
  rum_40: {
    ru: 'Ром / Алкоголь 40% об.',
    en: 'Rum / Alcohol 40% ABV',
    it: 'Rum / Alcolico 40% vol.',
    es: 'Ron / Licor 40% vol.',
  },
};

export const INGREDIENT_NOTES_MAP: Record<string, LocalizedText> = {
  milk_3_5: {
    ru: 'Базовый жидкий компонент молочных джелато',
    en: 'Primary liquid milk base component',
    it: 'Componente liquido principale per basi latte',
    es: 'Base líquida fundamental para helados de leche',
  },
  milk_1_5: {
    ru: 'Для более лёгких рецептур',
    en: 'For lighter, lower-fat formulations',
    it: 'Per ricette più leggere a ridotto contenuto di grassi',
    es: 'Para recetas más ligeras bajas en grasa',
  },
  cream_35: {
    ru: 'Основной источник молочного жира и шелковистой текстуры',
    en: 'Main source of dairy butterfat and silky texture',
    it: 'Fonte primaria di grassi nobili del latte e cremosità',
    es: 'Fuente principal de grasa láctea y textura sedosa',
  },
  cream_38: {
    ru: 'Высокожирные сливки',
    en: 'High-fat dairy cream',
    it: 'Panna ad alto contenuto di grassi',
    es: 'Nata de alto contenido graso',
  },
  smp_powder: {
    ru: 'Ключевой регулятор сухого остатка и связывания свободной воды. Внимание к пределу лактозы!',
    en: 'Key regulator of solids and free water binding. Mind lactose limit!',
    it: 'Regolatore di SLNG e legante dell’acqua libera. Attenzione al limite di lattosio!',
    es: 'Regulador de sólidos lácteos y agua libre. ¡Atención al límite de lactosa!',
  },
  wmp_powder: {
    ru: 'Полножирное сухое молоко',
    en: 'Full-fat whole milk powder',
    it: 'Latte intero in polvere ad alto contenuto lipidico',
    es: 'Leche entera en polvo con toda su grasa láctea',
  },
  mascarpone: {
    ru: 'Для тирамису и богатых сырных вкусов',
    en: 'Ideal for tiramisù and rich cream-cheese flavors',
    it: 'Ideale per tiramisù e gusti cremosi al formaggio',
    es: 'Ideal para tiramisú y sabores cremosos de queso',
  },
  sucrose: {
    ru: 'Эталон сладости и антизамерзания (POD 100 / PAC 100)',
    en: 'Standard benchmark of sweetness and anti-freezing (POD 100 / PAC 100)',
    it: 'Riferimento standard di dolcezza e anticongelante (POD 100 / PAC 100)',
    es: 'Referencia estándar de dulzor y anticongelación (POD 100 / PAC 100)',
  },
  dextrose: {
    ru: 'Понижает точку замерзания в 1.9 раза сильнее сахара, придавая кремовость без избыточной сладости',
    en: 'Lowers freezing point 1.9x stronger than sucrose, providing softness without cloying sweetness',
    it: 'Abbassa il punto di congelamento 1.9x rispetto al saccarosio (PAC 190), ideale per spatolabilità a freddo',
    es: 'Baja el punto de congelación 1.9x más que el azúcar, dando cremosidad sin dulzor excesivo',
  },
  atomized_glucose_38: {
    ru: 'Увеличивает сухой остаток и плотность тела, низкая сладость (POD 40, PAC 75)',
    en: 'Boosts total solids and body chewiness with mild sweetness (POD 40, PAC 75)',
    it: 'Aumenta i solidi totali e la corposità riducendo la dolcezza (POD 40, PAC 75)',
    es: 'Aumenta el extracto seco y el cuerpo con bajo dulzor (POD 40, PAC 75)',
  },
  invert_sugar: {
    ru: 'Придает эластичность и мягкость',
    en: 'Provides elasticity, moisture retention, and anti-crystallization softness',
    it: 'Conferisce elasticità, morbidezza e azione anticristallizzante',
    es: 'Aporta elasticidad, suavidad y efecto anticristalizante',
  },
  fructose: {
    ru: 'Очень сладкая с высоким PAC',
    en: 'Very high sweetness (POD 140) and strong anti-freezing power (PAC 190)',
    it: 'Elevatissimo potere dolcificante e forte potere anticongelante',
    es: 'Muy alto dulzor y gran poder anticongelante',
  },
  honey: {
    ru: 'Ароматный подсластитель с высоким PAC',
    en: 'Aromatic natural sweetener with high anti-freezing effect',
    it: 'Dolcificante naturale aromatico ad alto potere anticongelante',
    es: 'Edulcorante natural aromático con alto poder anticongelante',
  },
  trehalose: {
    ru: 'Антиоксидант, защищает структуру и цвет, умеренная сладость',
    en: 'Antioxidant disaccharide protecting structure and color with mild sweetness',
    it: 'Antiossidante naturale, protegge struttura e colore con dolcezza moderata',
    es: 'Antioxidante natural, protege estructura y color con dulzor moderado',
  },
  maltodextrin_19: {
    ru: 'Добавляет плотность без сладости и без размягчения',
    en: 'Adds body and solids without excessive sweetness or softening',
    it: 'Aggiunge struttura e solidi senza dolcezza né effetto anticongelante',
    es: 'Aporta cuerpo y sólidos sin dulzor excesivo ni ablandamiento',
  },
  egg_yolk: {
    ru: 'Натуральный эмульгатор (лецитин), жирность и вкус для Crema all’Uovo',
    en: 'Natural emulsifier (lecithin), richness and traditional flavor for Crema all’Uovo',
    it: 'Emulsionante naturale (lecitina), ricchezza e gusto per Crema all’Uovo',
    es: 'Emulsionante natural (lecitina), cremosidad y sabor para Crema all’Uovo',
  },
  whole_egg: {
    ru: 'Цельные яйца',
    en: 'Pasteurized whole eggs',
    it: 'Uova intere pastorizzate',
    es: 'Huevos enteros pasteurizados',
  },
  paste_hazelnut: {
    ru: 'Высокое содержание растительного жира, требует снижения сливок в базе',
    en: 'High vegetal oil content (~64%); reduce dairy cream in the base mix',
    it: 'Alto contenuto di olio vegetale (~64%), richiede riduzione della panna nella base',
    es: 'Alto contenido en grasa vegetal (~64%), requiere reducir la nata de la base',
  },
  paste_pistachio: {
    ru: 'Чистая 100% обжаренная фисташка',
    en: 'Pure 100% roasted Sicilian pistachio paste',
    it: 'Pura pasta di pistacchio tostato 100%',
    es: 'Pasta pura de pistacho tostado 100%',
  },
  cocoa_powder_22: {
    ru: 'Сильно связывает воду! Требует увеличения сахаров для компенсации горечи',
    en: 'Binds free water strongly! Requires higher sugars/PAC to prevent brittleness',
    it: 'Lega molta acqua libera! Richiede un incremento di zuccheri e PAC',
    es: 'Retiene mucha agua libre. Requiere mayor azúcar y PAC para mantener cremosidad',
  },
  dark_chocolate_70: {
    ru: 'Какао-масло застывает при низких температурах',
    en: 'Cocoa butter solidifies firmly at low showcase temperatures',
    it: 'Il burro di cacao cristallizza e indurisce a basse temperature',
    es: 'La manteca de cacao endurece a bajas temperaturas en vitrina',
  },
  stellamix_cf_100: {
    ru: 'Официальная Scheda Tecnica #7811 (Disaronno Ingredients): комплексная база холодного/горячего приготовления с растительным жиром, белками молока и стабилизаторами.',
    en: 'Official Scheda Tecnica #7811 (Disaronno): balanced base with vegetal fat, milk proteins and stabilisers.',
    it: 'Scheda Tecnica ufficiale #7811 (Disaronno Ingredients): base completa a caldo/freddo.',
    es: 'Ficha técnica oficial #7811 (Disaronno): base completa caliente/fría con estabilizantes.',
  },
  cremante_50: {
    ru: 'Официальная Scheda Tecnica #4086 (Disaronno Ingredients): полуфабрикат в порошке для фруктовых и молочных баз.',
    en: 'Official Scheda Tecnica #4086 (Disaronno): semi-finished powder base for creamy fruit & milk gelato.',
    it: 'Scheda Tecnica ufficiale #4086 (Disaronno Ingredients): semilavorato in polvere per basi frutta e latte.',
    es: 'Ficha técnica oficial #4086 (Disaronno): base semielaborada en polvo para helados de fruta y leche.',
  },
  neutral_stabilizer: {
    ru: 'Камедь рожкового дерева (E410), гуар (E412), альгинат натрия (E401)',
    en: 'Locust bean gum (E410), guar gum (E412), sodium alginate (E401)',
    it: 'Farina di semi di carrube (E410), gomma di guar (E412), alginato (E401)',
    es: 'Goma garrofín (E410), guar (E412), alginato de sodio (E401)',
  },
  strawberry_puree_10: {
    ru: 'Для клубничного сорбета',
    en: 'Sweetened puree ideal for strawberry sorbet',
    it: 'Purea zuccherata ideale per sorbetto alla fragola',
    es: 'Puré azucarado ideal para sorbete de fresa',
  },
  raspberry_puree_10: {
    ru: 'Высокая кислотность освежает вкус',
    en: 'Natural acidity brightens and refreshes fruit sorbets',
    it: 'L’elevata acidità naturale rinfresca e bilancia il gusto',
    es: 'Alta acidez natural que refresca y realza el sabor',
  },
  lemon_juice: {
    ru: 'Содержит натуральную лимонную кислоту',
    en: 'Contains natural citric acid for crisp lemon sorbets',
    it: 'Contiene acido citrico naturale per sorbetti freschi',
    es: 'Contiene ácido cítrico natural para sorbetes refrescantes',
  },
  water: {
    ru: 'Основа для сорбетов',
    en: 'Pure water base for fruit sorbets',
    it: 'Base liquida per sorbetti alla frutta',
    es: 'Base líquida para sorbetes de fruta',
  },
  rum_40: {
    ru: 'Осторожно: этанол экстремально снижает температуру замерзания!',
    en: 'Caution: ethanol drastically lowers the freezing point (~3.5x sucrose PAC)!',
    it: 'Attenzione: l’etanolo abbassa drasticamente il punto di congelamento!',
    es: 'Precaución: ¡el etanol baja drásticamente el punto de congelación!',
  },
};

// 2. TARGET PROFILES LOCALIZATION
export const PROFILE_NAMES_MAP: Record<string, LocalizedText> = {
  milky_minus_14: {
    ru: 'Молочное джелато под витрину -14°C (Холодный режим)',
    en: 'Milk Gelato for -14°C Display Case (Deep Cold)',
    it: 'Gelato al Latte Vetrina -14°C (Freddo Profondo)',
    es: 'Helado de Leche para Vitrina -14°C (Frío Profundo)',
  },
  milky: {
    ru: 'Молочное джелато (Стандартная витрина -11°C .. -12°C)',
    en: 'Milk Gelato (Standard Display -11°C .. -12°C)',
    it: 'Gelato al Latte Classico (Vetrina -11°C .. -12°C)',
    es: 'Helado de Leche Clásico (Vitrina -11°C .. -12°C)',
  },
  nut: {
    ru: 'Ореховое джелато (Фисташка, Фундук)',
    en: 'Nut Gelato (Pistachio, Hazelnut)',
    it: 'Gelato alla Frutta Secca (Pistacchio, Nocciola)',
    es: 'Helado de Frutos Secos (Pistacho, Avellana)',
  },
  chocolate: {
    ru: 'Шоколадное джелато (Cioccolato)',
    en: 'Chocolate Gelato (Dark / Milk)',
    it: 'Cioccolato Fondente / Tradizionale',
    es: 'Helado de Chocolate Tradicional',
  },
  sorbet: {
    ru: 'Фруктовый сорбет (Sorbetto di Frutta)',
    en: 'Fruit Sorbet (Water-based 0% fat)',
    it: 'Sorbetto alla Frutta (Base Acqua 0% grassi)',
    es: 'Sorbete de Fruta (Base Agua sin grasa)',
  },
  soft_serve: {
    ru: 'Мягкое мороженое (Soft Serve / Фризер)',
    en: 'Soft Serve Ice Cream (-7°C Direct Draw)',
    it: 'Gelato Espresso / Soft Serve (-7°C)',
    es: 'Helado Soft / Cremoso (-7°C)',
  },
};

export const PROFILE_DESCS_MAP: Record<string, LocalizedText> = {
  milky_minus_14: {
    ru: 'Оптимизировано под температуру витрины -14°C. Повышенный PAC (31–34) за счёт увеличения декстрозы предотвращает замерзание и обеспечивает лёгкую подачу лопаткой.',
    en: 'Optimized for deep -14°C display case. Higher PAC (31–34) via dextrose prevents hard ice crystal network and guarantees paddle scoopability.',
    it: 'Ottimizzato per vetrine a -14°C. PAC elevato (31–34) con destrosio per evitare congelamento duro e garantire perfetta spatolabilità.',
    es: 'Optimizado para vitrina a -14°C. PAC elevado (31–34) mediante dextrosa para evitar endurecimiento y garantizar servicio con espátula.',
  },
  milky: {
    ru: 'Классическая белая молочная основа. Шелковистая текстура, умеренная сладость, витрина -11°C .. -12°C.',
    en: 'Classic white dairy base. Silky texture, balanced sweetness, standard showcase -11°C to -12°C.',
    it: 'Classica base bianca al latte. Tessitura setosa, dolcezza calibrata, vetrina -11°C .. -12°C.',
    es: 'Base blanca láctea tradicional. Textura sedosa, dulzor equilibrado, vitrina estándar -11°C a -12°C.',
  },
  nut: {
    ru: 'Высокое содержание жиров из натуральной ореховой пасты. Требует меньшего количества сливок.',
    en: 'High vegetal fat content from 100% nut pastes. Requires reduced cream in the white base.',
    it: 'Alto contenuto di grassi vegetali dalla pasta di frutta secca. Richiede meno panna nella base.',
    es: 'Alto contenido de grasas naturales de pasta de frutos secos. Requiere menor porcentaje de nata.',
  },
  chocolate: {
    ru: 'Богатое какао-маслом и сухим какао. Какао связывает много воды и требует повышенного PAC и POD для мягкости.',
    en: 'Rich in cocoa butter and dry cocoa solids. Cocoa binds substantial water, requiring higher PAC for softness.',
    it: 'Ricco di burro di cacao e polvere secca. Il cacao lega molta acqua e richiede PAC e POD calibrati.',
    es: 'Rico en manteca de cacao y sólidos. El cacao retiene mucha agua y requiere un PAC elevado.',
  },
  sorbet: {
    ru: 'Без молочных жиров и белков (0% жира). Текстура формируется исключительно сахарами и фруктовыми волокнами.',
    en: 'Zero dairy fat or milk proteins (0% fat). Structure built strictly with sugars and fruit fibers.',
    it: 'Senza grassi o proteine del latte (0% grasso). Struttura formata unicamente da zuccheri e fibre.',
    es: 'Sin grasas lácteas ni proteínas (0% grasa). Textura lograda exclusivamente con azúcares y fibra frutal.',
  },
  soft_serve: {
    ru: 'Подаётся напрямую из фризера при температуре -6°C .. -8°C, поэтому требует меньшего PAC.',
    en: 'Dispensed straight from machine cylinder at -6°C to -8°C, requiring lower PAC.',
    it: 'Erogato direttamente dal mantecatore a -6°C .. -8°C, necessita di PAC più contenuto.',
    es: 'Servido directo de la máquina a -6°C .. -8°C, requiere menor nivel de PAC.',
  },
};

// 3. PRESETS LOCALIZATION
export const PRESET_NAMES_MAP: Record<string, LocalizedText> = {
  preset_stellamix_minus_14: {
    ru: 'Базовая смесь со Stellamix C.F. 100 (-14°C)',
    en: 'Base Mix with Stellamix C.F. 100 (-14°C)',
    it: 'Base Latte con Stellamix C.F. 100 (-14°C)',
    es: 'Mix Base con Stellamix C.F. 100 (-14°C)',
  },
  preset_stellamix_latte: {
    ru: 'Базовая молочная смесь со Stellamix C.F. 100 (-11°C)',
    en: 'Master Milk Base with Stellamix C.F. 100 (-11°C)',
    it: 'Base Latte Stellamix C.F. 100 Scheda #7811 (-11°C)',
    es: 'Mix Base Lácteo Stellamix C.F. 100 (-11°C)',
  },
  preset_fior_di_latte: {
    ru: 'Fiordilatte Classico (Классическое молочное)',
    en: 'Fiordilatte Classico (Traditional Milk)',
    it: 'Fiordilatte Classico Tradizionale',
    es: 'Fiordilatte Clásico Tradicional',
  },
  preset_nocciola: {
    ru: 'Nocciola Piemonte (Фундук Пьемонт)',
    en: 'Nocciola Piemonte (Hazelnut)',
    it: 'Nocciola Piemonte IGP',
    es: 'Nocciola Piamonte (Avellana)',
  },
  preset_pistacchio: {
    ru: 'Pistacchio Puro (Фисташка Сицилия)',
    en: 'Pistacchio Puro (Sicilian Pistachio)',
    it: 'Pistacchio Puro di Sicilia',
    es: 'Pistacchio Puro (Pistacho Sicilia)',
  },
  preset_cioccolato: {
    ru: 'Cioccolato Fondente (Тёмный шоколад)',
    en: 'Cioccolato Fondente (Dark Chocolate 70%)',
    it: 'Cioccolato Fondente Extra Dark',
    es: 'Cioccolato Fondente (Chocolate Negro 70%)',
  },
  preset_crema: {
    ru: 'Crema all’Uovo (Классический яичный крем)',
    en: 'Crema all’Uovo (Traditional Egg Custard)',
    it: 'Crema all’Uovo Tradizionale',
    es: 'Crema all’Uovo (Crema de Yema)',
  },
  preset_sorbetto_fragola: {
    ru: 'Sorbetto alla Fragola (Клубничный сорбет)',
    en: 'Sorbetto alla Fragola (Strawberry Sorbet)',
    it: 'Sorbetto alla Fragola Naturale',
    es: 'Sorbetto alla Fragola (Sorbete de Fresa)',
  },
  preset_sorbetto_limone: {
    ru: 'Sorbetto al Limone (Лимонный сорбет)',
    en: 'Sorbetto al Limone (Fresh Lemon Sorbet)',
    it: 'Sorbetto al Limone di Sicilia',
    es: 'Sorbetto al Limone (Sorbete de Limón)',
  },
};

export const PRESET_NOTES_MAP: Record<string, LocalizedText> = {
  preset_stellamix_minus_14: {
    ru: 'Специальная рецептура для витрины -14°C: повышена доля декстрозы для предотвращения оледенения смеси при -14°C.',
    en: 'Formula for -14°C display case: higher dextrose ratio prevents hard icing at deep cold temperature.',
    it: 'Ricetta specifica per vetrina a -14°C: quota destrosio aumentata per mantenere morbidezza.',
    es: 'Receta para vitrina a -14°C: mayor dextrosa para evitar cristalización dura a baja temperatura.',
  },
  preset_stellamix_latte: {
    ru: 'Рецепт составлен строго из 6 компонентов по официальной Scheda Tecnica #7811 (Disaronno Ingredients): Молоко 3.5%, Сливки 35%, Сахар, Декстроза, Сухое молоко, Stellamix C.F. 100.',
    en: 'Recipe formulated with 6 ingredients according to Disaronno Scheda Tecnica #7811: Milk, Cream, Sucrose, Dextrose, SMP, Stellamix C.F. 100.',
    it: 'Ricetta conforme alla Scheda Tecnica #7811 (Disaronno Ingredients): Latte 3.5%, Panna 35%, Saccarosio, Destrosio, SMP, Stellamix C.F. 100.',
    es: 'Receta conforme a la Ficha Técnica oficial #7811 de Disaronno Ingredients: 6 ingredientes perfectamente balanceados.',
  },
  preset_fior_di_latte: {
    ru: 'Золотой стандарт итальянской джелатерии. Сбалансирован под витрину -11°C .. -12°C.',
    en: 'Gold standard of artisan Italian gelato. Balanced for -11°C to -12°C showcase.',
    it: 'Il punto di riferimento della gelateria artigianale italiana. Bilanciato a -11°C .. -12°C.',
    es: 'El estándar de oro de la heladería artesanal italiana. Balanceado para -11°C a -12°C.',
  },
  preset_nocciola: {
    ru: 'Снижено количество сливок, так как паста фундука содержит 64% натурального растительного жира.',
    en: 'Cream is reduced because pure hazelnut paste already contains 64% natural nut oil.',
    it: 'Panna ridotta perché la pasta di nocciola contiene il 64% di grassi vegetali naturali.',
    es: 'Nata reducida ya que la pasta de avellana contiene un 64% de grasa vegetal natural.',
  },
  preset_pistacchio: {
    ru: 'Насыщенный благородный фисташковый вкус с идеальной эластичностью.',
    en: 'Rich noble Sicilian pistachio flavor with silky, elastic texture.',
    it: 'Gusto intenso e nobile di pistacchio con struttura elastica e setosa.',
    es: 'Sabor intenso y noble de pistacho con elasticidad y cremosidad ideales.',
  },
  preset_cioccolato: {
    ru: 'Какао связывает свободную влагу, поэтому повышен PAC (декстроза) для предотвращения ломкости.',
    en: 'Cocoa binds free water strongly, so PAC (dextrose) is increased to prevent brittleness.',
    it: 'Il cacao lega molta acqua libera, quindi il PAC (destrosio) è aumentato per prevenire friabilità.',
    es: 'El cacao retiene mucha agua libre, por lo que se aumenta el PAC (dextrosa) para evitar dureza.',
  },
  preset_crema: {
    ru: 'Желток действует как натуральный эмульгатор благодаря лецитину.',
    en: 'Egg yolk acts as a natural emulsifier thanks to lecithin.',
    it: 'Il tuorlo d’uovo agisce come emulsionante naturale grazie alla lecitina.',
    es: 'La yema de huevo actúa como emulsionante natural gracias a la lecitina.',
  },
  preset_sorbetto_fragola: {
    ru: '0% жира. Оптимальное соотношение декстрозы и сахарозы обеспечивает кремовость без кристалликов льда.',
    en: '0% fat. Optimal dextrose-to-sucrose ratio gives creamy scoopability with zero icy crystals.',
    it: '0% grassi. Rapporto ottimale destrosio/saccarosio per cremosità senza cristalli di ghiaccio.',
    es: '0% grasa. Relación óptima dextrosa/sacarosa para cremosidad sin cristales de hielo.',
  },
  preset_sorbetto_limone: {
    ru: 'Яркий освежающий вкус с 25% натурального сока лимона.',
    en: 'Crisp refreshing flavor with 25% freshly squeezed lemon juice.',
    it: 'Gusto fresco e vivace con il 25% di succo di limone fresco.',
    es: 'Sabor vibrante y refrescante con un 25% de zumo de limón natural.',
  },
};

export const PRESET_INSTRUCTIONS_MAP: Record<string, LocalizedText> = {
  preset_stellamix_minus_14: {
    ru: '1. Смешать сухие ингредиенты: сахарозу (165 г), декстрозу (80 г), сухое молоко СЗМ (25 г) и порошок Stellamix C.F. 100 (70 г).\n2. Влить молоко 3.5% (540 г) и сливки 35% (120 г).\n3. При 40°C ввести сухую смесь тонкой струйкой при перемешивании.\n4. Пастеризация при 85°C (или низкая при 65°C по Scheda Tecnica).\n5. Охладить до +4°C, созревание 4–6 часов.\n6. Загрузить во фризер.\nЗа счёт увеличения декстрозы до 80 г PAC достигает 32.2: джелато остаётся кремовым и легко набирается лопаткой даже при глубоких -14°C.',
    en: '1. Dry-blend the powders: sucrose (165 g), dextrose (80 g), skimmed milk powder (25 g), and Stellamix C.F. 100 (70 g).\n2. Pour whole milk 3.5% (540 g) and heavy cream 35% (120 g).\n3. At 40°C, disperse the dry blend gradually while whisking.\n4. Pasteurize at 85°C (or 65°C low pasteurization per Scheda Tecnica).\n5. Chill rapidly to +4°C and mature for 4–6 hours.\n6. Batch freeze.\nIncreasing dextrose to 80 g raises PAC to 32.2, keeping the gelato creamy and easy to scoop even in deep -14°C display cases.',
    it: '1. Miscelare a secco le polveri: saccarosio (165 g), destrosio (80 g), latte magro SMP (25 g) e Stellamix C.F. 100 (70 g).\n2. Versare latte intero 3.5% (540 g) e panna fresca 35% (120 g).\n3. A 40°C incorporare le polveri a pioggia mescolando.\n4. Pastorizzare a 85°C (o bassa pastorizzazione a 65°C da Scheda Tecnica).\n5. Raffreddare a +4°C, maturazione 4–6 ore.\n6. Mantecare.\nGrazie all’aumento del destrosio a 80 g, il PAC raggiunge 32.2: il gelato resta cremoso e facilmente spatolabile anche in vetrina a -14°C.',
    es: '1. Mezclar en seco los ingredientes en polvo: sacarosa (165 g), dextrosa (80 g), leche desnatada en polvo (25 g) y Stellamix C.F. 100 (70 g).\n2. Verter la leche entera 3.5% (540 g) y la nata 35% (120 g).\n3. A 40°C incorporar los polvos en lluvia sin dejar de batir.\n4. Pasteurizar a 85°C (o a 65°C según la Ficha Técnica).\n5. Enfriar a +4°C y dejar madurar 4–6 horas.\n6. Mantecar.\nAl aumentar la dextrosa a 80 g el PAC llega a 32.2, manteniendo el helado cremoso y fácil de servir incluso a -14°C.',
  },
  preset_stellamix_latte: {
    ru: '1. Смешать сухие ингредиенты: сахарозу, декстрозу, сухое молоко (СЗМ) и порошок Stellamix C.F. 100.\n2. В пастеризатор или сотейник залить молоко 3.5% и сливки 35%.\n3. При 40°C ввести сухую смесь тонкой струйкой при активном перемешивании венчиком или блендером.\n4. Провести пастеризацию при 85°C (или низкую пастеризацию при 65°C согласно технической карте Disaronno).\n5. Охладить до +4°C и оставить на созревание минимум на 30–60 минут (рекомендуется 4–6 часов для полной гидратации белков).\n6. Загрузить во фризер. Стабилизатор не требуется, так как E410/E466 и эмульгаторы уже входят в состав Stellamix.',
    en: '1. Dry-blend the powders: sucrose, dextrose, skimmed milk powder (SMP), and Stellamix C.F. 100.\n2. Pour whole milk 3.5% and heavy cream 35% into the pasteurizer or saucepan.\n3. At 40°C, add the dry mix slowly while mixing vigorously with a whisk or immersion blender.\n4. Pasteurize at 85°C (or low pasteurization at 65°C per Disaronno Technical Data Sheet).\n5. Cool down to +4°C and age for at least 30–60 minutes (4–6 hours recommended for full protein hydration).\n6. Batch freeze. No extra stabilizer is needed since E410/E466 and emulsifiers are already built into Stellamix.',
    it: '1. Miscelare le polveri: saccarosio, destrosio, latte magro in polvere (SMP) e Stellamix C.F. 100.\n2. Nel pastorizzatore versare latte intero 3.5% e panna 35%.\n3. A 40°C unire le polveri a filo agitando energicamente con frusta o mixer ad immersione.\n4. Pastorizzare a 85°C (o bassa pastorizzazione a 65°C secondo la Scheda Tecnica Disaronno).\n5. Raffreddare a +4°C e lasciar maturare almeno 30–60 minuti (consigliate 4–6 ore per idratare le proteine).\n6. Mantecare. Non serve altro neutro perché E410/E466 ed emulsionanti sono già inclusi in Stellamix.',
    es: '1. Mezclar los ingredientes secos: sacarosa, dextrosa, leche desnatada en polvo (SMP) y Stellamix C.F. 100.\n2. Verter la leche 3.5% y la nata 35% en el pasteurizador o cazo.\n3. A 40°C añadir los polvos poco a poco batiendo con varilla o túrmix.\n4. Pasteurizar a 85°C (o pasteurización baja a 65°C según la Ficha Técnica Disaronno).\n5. Enfriar a +4°C y madurar al menos 30–60 minutos (se recomiendan 4–6 horas para hidratar bien las proteínas).\n6. Mantecar. No necesita estabilizante adicional porque E410/E466 y los emulsionantes ya están integrados en Stellamix.',
  },
  preset_fior_di_latte: {
    ru: '1. Смешать сухие ингредиенты (сахароза, декстроза, СЗМ, нейтрализатор).\n2. Добавить молоко и сливки, нагреть до 85°C (пастеризация).\n3. Охладить до 4°C и оставить на созревание минимум на 4–6 часов.\n4. Залить во фризер.',
    en: '1. Dry-blend the powders (sucrose, dextrose, SMP, neutral stabilizer).\n2. Add milk and cream, heat to 85°C (pasteurization).\n3. Cool rapidly to 4°C and mature for at least 4–6 hours.\n4. Batch freeze.',
    it: '1. Miscelare gli ingredienti secchi (saccarosio, destrosio, latte magro, neutro).\n2. Aggiungere latte e panna, portare a 85°C (pastorizzazione).\n3. Raffreddare a 4°C e lasciar maturare almeno 4–6 ore.\n4. Mantecare.',
    es: '1. Mezclar los ingredientes secos (sacarosa, dextrosa, leche en polvo, neutro).\n2. Añadir la leche y la nata, calentar a 85°C (pasteurización).\n3. Enfriar a 4°C y dejar madurar un mínimo de 4–6 horas.\n4. Mantecar.',
  },
  preset_nocciola: {
    ru: '1. Пастеризовать белую основу.\n2. В созревшую основу вмешать 100% пасту фундука погружным блендером.\n3. Взбить во фризере.',
    en: '1. Pasteurize and age the white milk base.\n2. Blend 100% pure hazelnut paste into the cold aged mix using an immersion blender.\n3. Batch freeze.',
    it: '1. Pastorizzare e maturare la base bianca.\n2. Incorporare la pasta pura di nocciola al 100% con il mixer ad immersione.\n3. Mantecare.',
    es: '1. Pasteurizar y madurar la base blanca.\n2. Incorporar la pasta pura de avellana 100% con batidora de brazo.\n3. Mantecar.',
  },
  preset_pistacchio: {
    ru: '1. Пастеризовать и охладить молочную базу.\n2. Добавить 10% чистой пасты фисташки и гомогенизировать.\n3. Заморозить во фризере.',
    en: '1. Pasteurize and cool down the dairy base.\n2. Add 10% pure pistachio paste and homogenize well.\n3. Batch freeze.',
    it: '1. Pastorizzare e raffreddare la base latte.\n2. Aggiungere il 10% di pasta pura di pistacchio ed emulsionare con cura.\n3. Mantecare.',
    es: '1. Pasteurizar y enfriar la base láctea.\n2. Añadir un 10% de pasta pura de pistacho y homogeneizar.\n3. Mantecar.',
  },
  preset_cioccolato: {
    ru: '1. Нагреть молоко и сливки до 50°C.\n2. Ввести сахар, декстрозу, СЗМ и какао-порошок.\n3. При 75°C добавить измельченный шоколад 70%, растопить и прогреть до 85°C.\n4. Гомогенизировать, охладить, созреть 6 часов.',
    en: '1. Heat milk and cream to 50°C.\n2. Disperse sucrose, dextrose, SMP, and cocoa powder.\n3. At 75°C add chopped 70% dark chocolate, melt completely and heat to 85°C.\n4. Homogenize, chill to 4°C, and age for 6 hours before freezing.',
    it: '1. Scaldare latte e panna fino a 50°C.\n2. Aggiungere saccarosio, destrosio, latte magro e cacao amaro in polvere.\n3. A 75°C unire il cioccolato fondente 70% tritato, sciogliere e portare a 85°C.\n4. Omogeneizzare, abbattere a 4°C e maturare per 6 ore.',
    es: '1. Calentar la leche y la nata hasta 50°C.\n2. Incorporar azúcar, dextrosa, leche en polvo y cacao puro.\n3. A 75°C añadir el chocolate negro 70% troceado, fundir y llevar a 85°C.\n4. Homogeneizar, enfriar a 4°C y madurar 6 horas.',
  },
  preset_crema: {
    ru: '1. Взбить желтки с сахаром.\n2. Соединить с молоком и сливками.\n3. Пастеризовать при 82°C (не перегреть желток!).\n4. Охладить и заморозить.',
    en: '1. Whisk egg yolks with sugar.\n2. Combine with milk and cream.\n3. Pasteurize carefully at 82°C (do not overheat the yolk!).\n4. Chill, age, and batch freeze.',
    it: '1. Mescolare i tuorli con lo zucchero.\n2. Unire latte e panna.\n3. Pastorizzare a 82°C (senza superare la temperatura per non coagulare l’uovo!).\n4. Raffreddare e mantecare.',
    es: '1. Batir las yemas con el azúcar.\n2. Mezclar con la leche y la nata.\n3. Pasteurizar a 82°C (¡sin sobrecalentar la yema!).\n4. Enfriar, madurar y mantecar.',
  },
  preset_sorbetto_fragola: {
    ru: '1. Приготовить сахарный сироп: растворить сахар, декстрозу и нейтрализатор в воде, нагреть до 65-80°C.\n2. Быстро охладить сироп до 4°C.\n3. Смешать с холодным клубничным пюре блендером.\n4. Фризеровать.',
    en: '1. Prepare sugar syrup: dissolve sucrose, dextrose, and stabilizer in water and heat to 65–80°C.\n2. Chill the syrup quickly to 4°C.\n3. Blend with cold strawberry puree using an immersion blender.\n4. Batch freeze.',
    it: '1. Preparare lo sciroppo: sciogliere saccarosio, destrosio e neutro in acqua portando a 65-80°C.\n2. Raffreddare rapidamente lo sciroppo a 4°C.\n3. Frullare con la purea fredda di fragola tramite mixer ad immersione.\n4. Mantecare.',
    es: '1. Preparar el jarabe base: disolver azúcar, dextrosa y estabilizante en agua calentando a 65-80°C.\n2. Enfriar el jarabe rápidamente a 4°C.\n3. Mezclar en frío con el puré de fresa con batidora.\n4. Mantecar.',
  },
  preset_sorbetto_limone: {
    ru: '1. Сварить нейтральный сироп из воды, сахарозы, декстрозы и стабилизатора.\n2. Охладить до 4°C.\n3. Добавить свежий фильтрованный лимонный сок перед загрузкой во фризер.',
    en: '1. Cook a neutral syrup with water, sucrose, dextrose, and stabilizer.\n2. Chill to 4°C.\n3. Stir in fresh strained lemon juice just before batch freezing.',
    it: '1. Cuocere lo sciroppo base con acqua, saccarosio, destrosio e neutro.\n2. Raffreddare a 4°C.\n3. Unire il succo di limone fresco filtrato prima di versare nel mantecatore.',
    es: '1. Cocer el jarabe neutro con agua, sacarosa, dextrosa y estabilizante.\n2. Enfriar a 4°C.\n3. Añadir el zumo de limón fresco filtrado justo antes de mantecar.',
  },
};

// 4. HELPER ACCESSOR FUNCTIONS
export function getLocalizedIngredientName(ing: Ingredient, lang: Language): string {
  if (ing.names && ing.names[lang]) {
    return ing.names[lang];
  }
  const mapped = INGREDIENT_NAMES_MAP[ing.id];
  if (mapped && mapped[lang]) {
    return mapped[lang];
  }
  if (lang === 'it' && ing.nameIt) {
    return ing.nameIt;
  }
  return ing.name;
}

export function getLocalizedIngredientNotes(ing: Ingredient, lang: Language): string | undefined {
  if (ing.notesLang && ing.notesLang[lang]) {
    return ing.notesLang[lang];
  }
  const mapped = INGREDIENT_NOTES_MAP[ing.id];
  if (mapped && mapped[lang]) {
    return mapped[lang];
  }
  return ing.notes;
}

export function getLocalizedProfileName(profile: TargetProfile, lang: Language): string {
  if (profile.names && profile.names[lang]) {
    return profile.names[lang];
  }
  const mapped = PROFILE_NAMES_MAP[profile.id];
  if (mapped && mapped[lang]) {
    return mapped[lang];
  }
  return profile.name;
}

export function getLocalizedProfileDesc(profile: TargetProfile, lang: Language): string {
  if (profile.descriptions && profile.descriptions[lang]) {
    return profile.descriptions[lang];
  }
  const mapped = PROFILE_DESCS_MAP[profile.id];
  if (mapped && mapped[lang]) {
    return mapped[lang];
  }
  return profile.description;
}

export function getLocalizedRecipeName(recipe: Recipe, lang: Language): string {
  if (recipe.names && recipe.names[lang]) {
    return recipe.names[lang];
  }
  if (!recipe.isCustomName) {
    const mapped = PRESET_NAMES_MAP[recipe.id];
    if (mapped && mapped[lang]) {
      return mapped[lang];
    }
  }
  return recipe.name;
}

export function getLocalizedRecipeNotes(recipe: Recipe, lang: Language): string | undefined {
  if (recipe.notesLang && recipe.notesLang[lang]) {
    return recipe.notesLang[lang];
  }
  const mapped = PRESET_NOTES_MAP[recipe.id];
  if (mapped && mapped[lang]) {
    return mapped[lang];
  }
  return recipe.notes;
}

export function getLocalizedRecipeInstructions(recipe: Recipe, lang: Language): string | undefined {
  if (recipe.instructionsLang && recipe.instructionsLang[lang]) {
    return recipe.instructionsLang[lang];
  }
  if (!recipe.isCustomInstructions) {
    const mapped = PRESET_INSTRUCTIONS_MAP[recipe.id];
    if (mapped && mapped[lang]) {
      return mapped[lang];
    }
  }
  return recipe.instructions;
}

export function getLocalizedCategoryName(category: IngredientCategory, t: Translations): string {
  switch (category) {
    case 'dairy':
      return t.catDairy;
    case 'sugars':
      return t.catSugars;
    case 'pastes':
      return t.catPastes;
    case 'chocolate':
      return t.catChocolate;
    case 'fruits':
      return t.catFruits;
    case 'eggs':
      return t.catEggs;
    case 'stabilizers':
      return t.catStabilizers;
    case 'fats':
      return t.fat;
    default:
      return t.catAll;
  }
}
