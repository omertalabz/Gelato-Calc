export type Language = 'ru' | 'en' | 'it' | 'es';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  // Nav
  tabRecipe: string;
  tabBalance: string;
  tabShowcase: string;
  tabTools: string;
  tabIngredients: string;
  phoneMode: string;
  desktopMode: string;
  newRecipe: string;
  // Parameters
  fat: string;
  sugars: string;
  snf: string;
  otherSolids: string;
  totalSolids: string;
  water: string;
  pod: string;
  pac: string;
  freezingPoint: string;
  targetTemp: string;
  weight: string;
  share: string;
  totalWeight: string;
  targetZone: string;
  // Table headers & columns
  colIngredient: string;
  colCategory: string;
  colWeight: string;
  colShare: string;
  colFat: string;
  colSnf: string;
  colSugars: string;
  colOtherSolids: string;
  colPod: string;
  colPac: string;
  colActions: string;
  unitGram: string;
  shortFat: string;
  shortSnf: string;
  shortSugars: string;
  shortOtherSolids: string;
  shortTotalSolids: string;
  itemsShort: string;
  podIndexDesc: string;
  scalerRatioLabel: string;
  pwaOfflineBadge: string;
  downloadGitHubZipBtn: string;
  downloadGitHubZipDesc: string;
  pageTitle: string;
  // Actions
  delete: string;
  edit: string;
  cancel: string;
  apply: string;
  close: string;
  copied: string;
  copyLink: string;
  print: string;
  // Statuses
  statusIdeal: string;
  statusLow: string;
  statusHigh: string;
  balancedVerdict: string;
  unbalancedVerdict: string;
  autoSaved: string;
  // Texture
  tempSliderLabel: string;
  phaseState: string;
  frozenWater: string;
  liquidSyrup: string;
  crystallizationStart: string;
  idealFrozenRange: string;
  textureIdeal: string;
  textureSoft: string;
  textureTooSoft: string;
  textureFirm: string;
  textureTooHard: string;
  // Tools & Actions
  sugarSolver: string;
  sugarSolverDesc: string;
  scaleBatch: string;
  scaleBatchDesc: string;
  techCard: string;
  techCardDesc: string;
  glossary: string;
  glossaryDesc: string;
  presetsTitle: string;
  profileTitle: string;
  saveRecipe: string;
  exportJSON: string;
  importJSON: string;
  resetDefault: string;
  resetConfirm: string;
  androidGuide: string;
  addIngredient: string;
  createCustomProduct: string;
  notes: string;
  notesTitle: string;
  notesPlaceholder: string;
  done: string;
  ingredient: string;
  baseBadge: string;
  customBadge: string;
  searchPlaceholder: string;
  noResults: string;
  recipeEmpty: string;
  addFirstIngredient: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  language: string;
  // Categories
  catAll: string;
  catDairy: string;
  catSugars: string;
  catPastes: string;
  catChocolate: string;
  catFruits: string;
  catEggs: string;
  catStabilizers: string;
  // Advice
  pacLowAdvice: string;
  pacHighAdvice: string;
  podHighAdvice: string;
  clickAutoBalance: string;
  // Sugar Solver Modal
  solverTitle: string;
  solverDesc: string;
  solverTargetPac: string;
  solverCurrentPac: string;
  solverCurrentPod: string;
  solverSucroseCurrent: string;
  solverDextroseCurrent: string;
  solverBalancedTitle: string;
  solverApplyButton: string;
  solverFormulaDesc: string;
  solverNotNeeded: string;
  solverNoSugars: string;
  // Batch Scaler Modal
  scalerTitle: string;
  scalerDesc: string;
  scalerCurrentWeight: string;
  scalerTargetWeight: string;
  scalerApplyButton: string;
  scalerPresetsLabel: string;
  scalerPreset1kg: string;
  scalerPreset2kg: string;
  scalerPreset3kg: string;
  scalerPreset4kg: string;
  scalerPreset5kg: string;
  // Custom Ingredient Modal
  customModalTitle: string;
  customModalDesc: string;
  customNameLabel: string;
  customNamePlaceholder: string;
  customNameItLabel: string;
  customNameItPlaceholder: string;
  customCategoryLabel: string;
  customFatLabel: string;
  customSnfLabel: string;
  customSugarsLabel: string;
  customOtherSolidsLabel: string;
  customPodLabel: string;
  customPacLabel: string;
  customNotesLabel: string;
  customTotalSolidsPreview: string;
  customWaterPreview: string;
  customSaveButton: string;
  // Tech Card Modal
  techCardHeader: string;
  techCardCategory: string;
  techCardShowcaseTemp: string;
  techCardDate: string;
  techCardFormulaSummary: string;
  techCardPreparationInstructions: string;
  techCardNotesTitle: string;
  techCardPrintPdf: string;
  techCardIngredientsTitle: string;
  techCardAverages: string;
  // Android Guide Modal
  androidGuideTitle: string;
  androidGuideDesc: string;
  androidScanQr: string;
  androidScanQrDesc: string;
  androidDirectLink: string;
  androidInstructionsTitle: string;
  androidStep1: string;
  androidStep2: string;
  androidStep3: string;
  androidInstallDirectBtn: string;
  androidInstalledBadge: string;
  // Glossary Modal
  glossaryModalTitle: string;
  glossaryModalSubtitle: string;
  // Ingredients Manager
  managerTitle: string;
  managerSubtitle: string;
  managerSearchPlaceholder: string;
  managerFilterCategory: string;
  managerAddBtn: string;
  managerDeleteConfirm: string;
  managerCustomTag: string;
  managerBaseTag: string;
  // Simulator
  simulatorTitle: string;
  simulatorSubtitle: string;
  simulatorTempLabel: string;
  simulatorStructureTitle: string;
  simulatorIceRatio: string;
  simulatorSyrupRatio: string;
  simulatorTextureVerdict: string;
  simulatorLactoseWarning: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    appTitle: 'Gelato Bilanciamento',
    appSubtitle: 'Pro Lab',
    tabRecipe: 'Рецепт',
    tabBalance: 'Баланс',
    tabShowcase: 'Витрина',
    tabTools: 'Действия',
    tabIngredients: 'База',
    phoneMode: 'Экран смартфона',
    desktopMode: 'Настольный вид',
    newRecipe: 'Новый рецепт',
    fat: 'Жирность (Fat)',
    sugars: 'Сахара (Zuccheri)',
    snf: 'СОМО (MSNF)',
    otherSolids: 'Прочие СВ',
    totalSolids: 'Сухие вещества (TS)',
    water: 'Вода',
    pod: 'Сладость (POD)',
    pac: 'Антизамерзание (PAC)',
    freezingPoint: 'Точка замерзания',
    targetTemp: 'Витрина',
    weight: 'Вес, г',
    share: 'Доля %',
    totalWeight: 'Общая масса',
    targetZone: 'Целевая зона',
    colIngredient: 'Ингредиент',
    colCategory: 'Категория',
    colWeight: 'Вес (г)',
    colShare: 'Доля %',
    colFat: 'Жир %',
    colSnf: 'СОМО %',
    colSugars: 'Сахара %',
    colOtherSolids: 'Прочие %',
    colPod: 'POD',
    colPac: 'PAC',
    colActions: 'Действия',
    unitGram: 'г',
    shortFat: 'Ж',
    shortSnf: 'СОМО',
    shortSugars: 'Сах',
    shortOtherSolids: 'Прочие',
    shortTotalSolids: 'СВ',
    itemsShort: 'ингр.',
    podIndexDesc: 'индекс (сахароза = 100)',
    scalerRatioLabel: 'Коэффициент',
    pwaOfflineBadge: 'PWA Автономный режим · Работает офлайн',
    downloadGitHubZipBtn: 'Скачать ZIP для GitHub (сборка APK)',
    downloadGitHubZipDesc: 'Готовый проект с GitHub Actions: загрузите в репозиторий и скачайте готовый APK',
    pageTitle: 'Gelato Bilanciamento — Калькулятор балансировки джелато',
    delete: 'Удалить',
    edit: 'Изменить',
    cancel: 'Отмена',
    apply: 'Применить',
    close: 'Закрыть',
    copied: 'Скопировано!',
    copyLink: 'Скопировать ссылку',
    print: 'Распечатать',
    statusIdeal: 'В норме',
    statusLow: 'Ниже нормы',
    statusHigh: 'Выше нормы',
    balancedVerdict: 'Идеальный баланс! Все параметры в норме под витрину. Текстура будет мягкой, нежной и устойчивой.',
    unbalancedVerdict: 'Требуется корректировка рецепта.',
    autoSaved: 'Автосохранено',
    tempSliderLabel: 'Температура витрины / подачи',
    phaseState: 'Фазовое состояние при',
    frozenWater: 'Кристаллы льда (заморожено)',
    liquidSyrup: 'Жидкий концентрированный сироп',
    crystallizationStart: 'Начало кристаллизации',
    idealFrozenRange: 'Идеальный диапазон вымороженной воды для подачи лопаткой: 72% – 78%.',
    textureIdeal: 'Идеальная консистенция (Cremoso)',
    textureSoft: 'Очень нежное / Мягкое',
    textureTooSoft: 'Слишком мягкое (течёт)',
    textureFirm: 'Плотное / Твердоватое',
    textureTooHard: 'Слишком твёрдое / Ледяное',
    sugarSolver: 'Баланс сахаров',
    sugarSolverDesc: 'Автоподбор сахароза / декстроза под точный PAC',
    scaleBatch: 'Масштабировать',
    scaleBatchDesc: 'Пересчет веса под объем ванночки фризера',
    techCard: 'Техкарта',
    techCardDesc: 'Печать / экспорт технологической карты',
    glossary: 'Справочник',
    glossaryDesc: 'Теория и формулы POD & PAC',
    presetsTitle: 'Готовые рецепты джелато',
    profileTitle: 'Категория балансировки витрины',
    saveRecipe: 'Сохранить в избранные',
    exportJSON: 'Экспортировать файл (.json)',
    importJSON: 'Импортировать файл (.json)',
    resetDefault: 'Сбросить к эталону',
    resetConfirm: 'Сбросить текущие значения к эталонному рецепту?',
    androidGuide: 'Установить на Android',
    addIngredient: '+ Ингредиент',
    createCustomProduct: '+ Создать новый продукт в базу',
    notes: 'Заметки',
    notesTitle: 'Заметки джелатьере к рецепту',
    notesPlaceholder: 'Температура созревания, время пастеризации, особенности замеса...',
    done: 'Готово',
    ingredient: 'Ингредиент',
    baseBadge: 'База',
    customBadge: 'Свой',
    searchPlaceholder: 'Поиск ингредиента (молоко, сливки, сахар...)...',
    noResults: 'Ничего не найдено',
    recipeEmpty: 'Рецепт пуст',
    addFirstIngredient: 'Добавить первый ингредиент',
    theme: 'Тема оформления',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    language: 'Язык интерфейса',
    catAll: 'Все',
    catDairy: 'Молочные',
    catSugars: 'Сахара',
    catPastes: 'Пасты',
    catChocolate: 'Шоколад',
    catFruits: 'Фрукты',
    catEggs: 'Яйца',
    catStabilizers: 'Базы и стаб.',
    pacLowAdvice: 'PAC занижен (будет твердым при подаче). ',
    pacHighAdvice: 'PAC завышен (будет слишком быстро таять). ',
    podHighAdvice: 'POD слишком высокий (приторное). ',
    clickAutoBalance: 'Нажмите «Автобаланс» для выравнивания сахаров.',
    solverTitle: 'Автоматический балансировщик сахаров',
    solverDesc: 'Точный расчёт пропорции Сахароза / Декстроза для достижения целевого PAC без изменения веса партии',
    solverTargetPac: 'Целевой PAC профиля',
    solverCurrentPac: 'Текущий PAC смеси',
    solverCurrentPod: 'Текущий POD (Сладость)',
    solverSucroseCurrent: 'Сахароза в рецепте',
    solverDextroseCurrent: 'Декстроза в рецепте',
    solverBalancedTitle: 'Рассчитанные значения сахаров:',
    solverApplyButton: 'Применить новые пропорции сахаров',
    solverFormulaDesc: 'Математическая система двух уравнений: сохраняет суммарный вес сахаров и точно попадает в PAC профиля.',
    solverNotNeeded: 'PAC уже находится в идеальном целевом диапазоне!',
    solverNoSugars: 'Для работы балансировщика в рецепте должны присутствовать сахароза и/или декстроза.',
    scalerTitle: 'Масштабирование партии',
    scalerDesc: 'Пропорциональный пересчет веса всех ингредиентов под нужный объем ванночки или чаши фризера',
    scalerCurrentWeight: 'Текущий вес партии',
    scalerTargetWeight: 'Целевой суммарный вес (г)',
    scalerApplyButton: 'Пересчитать рецепт',
    scalerPresetsLabel: 'Быстрый выбор объема:',
    scalerPreset1kg: '1 кг (1000 г)',
    scalerPreset2kg: '2 кг (2000 г)',
    scalerPreset3kg: '3 кг (3000 г)',
    scalerPreset4kg: '4 кг (Гастроемкость 5л)',
    scalerPreset5kg: '5 кг (Фризер 5л)',
    customModalTitle: 'Добавление собственного ингредиента',
    customModalDesc: 'Внесите физико-химические показатели с технической карты (Scheda Tecnica) производителя',
    customNameLabel: 'Название продукта',
    customNamePlaceholder: 'Например: Молоко фермерское 4.2%',
    customNameItLabel: 'Итальянское название (необязательно)',
    customNameItPlaceholder: 'Latte intero fattoria',
    customCategoryLabel: 'Категория сырья',
    customFatLabel: 'Жирность (%)',
    customSnfLabel: 'СОМО / MSNF (%)',
    customSugarsLabel: 'Сахара (%)',
    customOtherSolidsLabel: 'Прочие сухие вещества (%)',
    customPodLabel: 'Коэффициент сладости (POD)',
    customPacLabel: 'Антизамерзание (PAC)',
    customNotesLabel: 'Заметки и особенности',
    customTotalSolidsPreview: 'Сухие вещества (TS):',
    customWaterPreview: 'Вода (Water):',
    customSaveButton: 'Сохранить ингредиент в библиотеку',
    techCardHeader: 'ТЕХНОЛОГИЧЕСКАЯ КАРТА ПРОИЗВОДСТВА ДЖЕЛАТО',
    techCardCategory: 'Категория витрины',
    techCardShowcaseTemp: 'Рекомендуемая температура витрины',
    techCardDate: 'Дата формирования карты',
    techCardFormulaSummary: 'Физико-химические показатели смеси',
    techCardPreparationInstructions: 'Технологический регламент приготовления',
    techCardNotesTitle: 'Примечания джелатьере к рецептуре',
    techCardPrintPdf: 'Печать / Сохранить в PDF',
    techCardIngredientsTitle: 'Спецификация сырьевого набора (рецептура на партию)',
    techCardAverages: 'ИТОГО ПО КАРТЕ',
    androidGuideTitle: 'Установка приложения на Android',
    androidGuideDesc: 'Запуск в полноэкранном режиме без адресной строки браузера',
    androidScanQr: 'Сканируйте QR-код камерой смартфона',
    androidScanQrDesc: 'Наведите камеру смартфона для мгновенного перехода в приложение',
    androidDirectLink: 'Прямая ссылка на приложение:',
    androidInstructionsTitle: 'Инструкция по установке в Google Chrome / Samsung Internet:',
    androidStep1: '1. Откройте ссылку в браузере Google Chrome на вашем телефоне.',
    androidStep2: '2. Нажмите на меню из трёх точек (⋮) в правом верхнем углу.',
    androidStep3: '3. Выберите «Установить приложение» или «Добавить на главный экран».',
    androidInstallDirectBtn: 'Установить приложение в 1 клик',
    androidInstalledBadge: 'Приложение уже установлено',
    glossaryModalTitle: 'Наука о джелато (Scienza del Gelato)',
    glossaryModalSubtitle: 'Профессиональное итальянское балансирование (Bilanciamento)',
    managerTitle: 'Библиотека ингредиентов джелатерии',
    managerSubtitle: 'Физико-химические характеристики компонентов: Жиры, СОМО, Сахара, POD и PAC',
    managerSearchPlaceholder: 'Поиск по названию или категории...',
    managerFilterCategory: 'Фильтр категории',
    managerAddBtn: '+ Новый ингредиент',
    managerDeleteConfirm: 'Удалить этот пользовательский ингредиент?',
    managerCustomTag: 'Пользовательский',
    managerBaseTag: 'Базовый',
    simulatorTitle: 'Симулятор структуры и витрины',
    simulatorSubtitle: 'Криоскопическая кривая замораживания воды и фазовое состояние смеси',
    simulatorTempLabel: 'Температура в ванночке витрины (°C)',
    simulatorStructureTitle: 'Фазовое распределение при выбранной температуре',
    simulatorIceRatio: 'Вымороженная вода (Кристаллы льда)',
    simulatorSyrupRatio: 'Жидкая фаза (Концентрированный сироп)',
    simulatorTextureVerdict: 'Оценка текстуры лопаткой (Spatolabilità):',
    simulatorLactoseWarning: 'Внимание: высокий риск кристаллизации лактозы (песчанистость структуры). Рекомендуется снизить СОМО.',
  },
  en: {
    appTitle: 'Gelato Bilanciamento',
    appSubtitle: 'Pro Lab',
    tabRecipe: 'Recipe',
    tabBalance: 'Balance',
    tabShowcase: 'Showcase',
    tabTools: 'Tools',
    tabIngredients: 'Ingredients',
    phoneMode: 'Smartphone',
    desktopMode: 'Desktop view',
    newRecipe: 'New Recipe',
    fat: 'Fat %',
    sugars: 'Sugars %',
    snf: 'MSNF (Milk Solids)',
    otherSolids: 'Other Solids',
    totalSolids: 'Total Solids (TS)',
    water: 'Water',
    pod: 'Sweetness (POD)',
    pac: 'Anti-Freezing (PAC)',
    freezingPoint: 'Freezing Point',
    targetTemp: 'Display case',
    weight: 'Weight, g',
    share: 'Share %',
    totalWeight: 'Total Batch Weight',
    targetZone: 'Target range',
    colIngredient: 'Ingredient',
    colCategory: 'Category',
    colWeight: 'Weight (g)',
    colShare: 'Share %',
    colFat: 'Fat %',
    colSnf: 'MSNF %',
    colSugars: 'Sugars %',
    colOtherSolids: 'Other %',
    colPod: 'POD',
    colPac: 'PAC',
    colActions: 'Actions',
    unitGram: 'g',
    shortFat: 'Fat',
    shortSnf: 'MSNF',
    shortSugars: 'Sug.',
    shortOtherSolids: 'Other',
    shortTotalSolids: 'TS',
    itemsShort: 'items',
    podIndexDesc: 'index (sucrose = 100)',
    scalerRatioLabel: 'Scale ratio',
    pwaOfflineBadge: 'PWA Standalone · Offline Ready',
    downloadGitHubZipBtn: 'Download ZIP for GitHub (APK Build)',
    downloadGitHubZipDesc: 'Ready project with GitHub Actions workflow to compile Android APK automatically',
    pageTitle: 'Gelato Bilanciamento — Artisan Gelato Formulation Lab',
    delete: 'Delete',
    edit: 'Edit',
    cancel: 'Cancel',
    apply: 'Apply',
    close: 'Close',
    copied: 'Copied!',
    copyLink: 'Copy link',
    print: 'Print',
    statusIdeal: 'Optimal',
    statusLow: 'Below target',
    statusHigh: 'Above target',
    balancedVerdict: 'Perfect balance! All parameters are in optimal range for showcase temperature. Texture will be smooth and scoopable.',
    unbalancedVerdict: 'Recipe requires adjustment.',
    autoSaved: 'Auto-saved',
    tempSliderLabel: 'Showcase / Serving Temperature',
    phaseState: 'Phase state at',
    frozenWater: 'Frozen water (Ice crystals)',
    liquidSyrup: 'Liquid unfrozen syrup',
    crystallizationStart: 'Initial Freezing Point',
    idealFrozenRange: 'Ideal frozen water range for gelato paddle scoopability: 72% – 78%.',
    textureIdeal: 'Ideal consistency (Cremoso)',
    textureSoft: 'Very soft & delicate',
    textureTooSoft: 'Too soft (melts fast)',
    textureFirm: 'Firm / Dense',
    textureTooHard: 'Too hard / Icy',
    sugarSolver: 'Sugar Solver',
    sugarSolverDesc: 'Auto-solve sucrose & dextrose for exact PAC',
    scaleBatch: 'Scale Batch',
    scaleBatchDesc: 'Batch size scaling for freezer batch cylinder',
    techCard: 'Tech Sheet',
    techCardDesc: 'Print / export formula tech sheet',
    glossary: 'Glossary',
    glossaryDesc: 'POD & PAC science and formulas',
    presetsTitle: 'Master Gelato Recipes',
    profileTitle: 'Display Case Balancing Profile',
    saveRecipe: 'Save to favorites',
    exportJSON: 'Export file (.json)',
    importJSON: 'Import file (.json)',
    resetDefault: 'Reset to master recipe',
    resetConfirm: 'Reset recipe to master formulation?',
    androidGuide: 'Install on Android',
    addIngredient: '+ Ingredient',
    createCustomProduct: '+ Create custom ingredient',
    notes: 'Notes',
    notesTitle: 'Master Gelatiere Notes',
    notesPlaceholder: 'Aging temperature, pasteurization stages, maturation time...',
    done: 'Done',
    ingredient: 'Ingredient',
    baseBadge: 'Base',
    customBadge: 'Custom',
    searchPlaceholder: 'Search ingredients (milk, cream, sugar...)...',
    noResults: 'No ingredients found',
    recipeEmpty: 'Recipe is empty',
    addFirstIngredient: 'Add first ingredient',
    theme: 'Color Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'App Language',
    catAll: 'All',
    catDairy: 'Dairy',
    catSugars: 'Sugars',
    catPastes: 'Nut Pastes',
    catChocolate: 'Chocolate',
    catFruits: 'Fruits',
    catEggs: 'Eggs',
    catStabilizers: 'Bases & Stab.',
    pacLowAdvice: 'PAC is too low (gelato will be too hard). ',
    pacHighAdvice: 'PAC is too high (gelato will melt too fast). ',
    podHighAdvice: 'POD is too high (excessive sweetness). ',
    clickAutoBalance: 'Click "Sugar Solver" to balance sugars automatically.',
    solverTitle: 'Automatic Sugar Balance Solver',
    solverDesc: 'Solves exact ratio of Sucrose and Dextrose to achieve target PAC while keeping batch weight unchanged',
    solverTargetPac: 'Profile Target PAC',
    solverCurrentPac: 'Current Mix PAC',
    solverCurrentPod: 'Current POD (Sweetness)',
    solverSucroseCurrent: 'Sucrose in recipe',
    solverDextroseCurrent: 'Dextrose in recipe',
    solverBalancedTitle: 'Calculated sugar adjustment:',
    solverApplyButton: 'Apply calculated sugar ratio',
    solverFormulaDesc: 'Mathematical 2-variable solver: preserves total sugar weight and hits the display PAC perfectly.',
    solverNotNeeded: 'PAC is already in optimal target range!',
    solverNoSugars: 'To run the sugar solver, your recipe must include sucrose and/or dextrose.',
    scalerTitle: 'Batch Scaler',
    scalerDesc: 'Proportionally scales all ingredients to match your batch freezer capacity or container volume',
    scalerCurrentWeight: 'Current batch weight',
    scalerTargetWeight: 'Target total weight (g)',
    scalerApplyButton: 'Scale recipe items',
    scalerPresetsLabel: 'Quick container volume:',
    scalerPreset1kg: '1 kg (1000 g)',
    scalerPreset2kg: '2 kg (2000 g)',
    scalerPreset3kg: '3 kg (3000 g)',
    scalerPreset4kg: '4 kg (Standard 5L pan)',
    scalerPreset5kg: '5 kg (Freezer batch cylinder)',
    customModalTitle: 'Add Custom Raw Ingredient',
    customModalDesc: 'Enter chemical & physical specs from manufacturer Technical Data Sheet (Scheda Tecnica)',
    customNameLabel: 'Ingredient Name',
    customNamePlaceholder: 'e.g. Farm Fresh Milk 4.2%',
    customNameItLabel: 'Italian Name (optional)',
    customNameItPlaceholder: 'Latte intero fattoria',
    customCategoryLabel: 'Ingredient Category',
    customFatLabel: 'Fat %',
    customSnfLabel: 'MSNF / Milk Solids %',
    customSugarsLabel: 'Sugars %',
    customOtherSolidsLabel: 'Other Solids %',
    customPodLabel: 'Sweetness Index (POD)',
    customPacLabel: 'Anti-Freezing Index (PAC)',
    customNotesLabel: 'Notes & observations',
    customTotalSolidsPreview: 'Total Solids (TS):',
    customWaterPreview: 'Water content:',
    customSaveButton: 'Save ingredient to library',
    techCardHeader: 'ARTISAN GELATO PRODUCTION TECH SHEET',
    techCardCategory: 'Showcase profile',
    techCardShowcaseTemp: 'Recommended showcase temperature',
    techCardDate: 'Generation date',
    techCardFormulaSummary: 'Chemical-physical balance metrics',
    techCardPreparationInstructions: 'Standard Operating Procedure (SOP)',
    techCardNotesTitle: 'Gelatiere formulation notes',
    techCardPrintPdf: 'Print / Save to PDF',
    techCardIngredientsTitle: 'Raw ingredients batch specification',
    techCardAverages: 'BATCH TOTALS',
    androidGuideTitle: 'Install App on Android',
    androidGuideDesc: 'Run in full-screen standalone mode without browser URL bar',
    androidScanQr: 'Scan QR code with smartphone camera',
    androidScanQrDesc: 'Point phone camera to open the app instantly on your mobile device',
    androidDirectLink: 'Direct application link:',
    androidInstructionsTitle: 'Installation steps for Chrome / Samsung Internet:',
    androidStep1: '1. Open link in Google Chrome on your smartphone.',
    androidStep2: '2. Tap the three-dot menu (⋮) in the top-right corner.',
    androidStep3: '3. Tap "Install App" or "Add to Home screen".',
    androidInstallDirectBtn: 'Install App directly',
    androidInstalledBadge: 'Application already installed',
    glossaryModalTitle: 'The Science of Gelato (Scienza del Gelato)',
    glossaryModalSubtitle: 'Traditional Italian artisan balancing principles (Bilanciamento)',
    managerTitle: 'Gelato Ingredients Database',
    managerSubtitle: 'Physicochemical specifications: Fat, MSNF, Sugars, POD and PAC',
    managerSearchPlaceholder: 'Search by ingredient name or category...',
    managerFilterCategory: 'Filter by category',
    managerAddBtn: '+ Custom ingredient',
    managerDeleteConfirm: 'Delete this custom ingredient?',
    managerCustomTag: 'Custom',
    managerBaseTag: 'Base',
    simulatorTitle: 'Texture & Showcase Simulator',
    simulatorSubtitle: 'Freezing curve simulation and liquid-solid phase distribution',
    simulatorTempLabel: 'Display case pan temperature (°C)',
    simulatorStructureTitle: 'Phase distribution at selected temperature',
    simulatorIceRatio: 'Frozen Water (Ice crystals)',
    simulatorSyrupRatio: 'Unfrozen Phase (Concentrated syrup)',
    simulatorTextureVerdict: 'Paddle scoopability assessment (Spatolabilità):',
    simulatorLactoseWarning: 'Warning: high risk of lactose crystallization (sandy texture defect). Reduce MSNF.',
  },
  it: {
    appTitle: 'Gelato Bilanciamento',
    appSubtitle: 'Pro Lab',
    tabRecipe: 'Ricetta',
    tabBalance: 'Bilancio',
    tabShowcase: 'Vetrina',
    tabTools: 'Strumenti',
    tabIngredients: 'Ingredienti',
    phoneMode: 'Smartphone',
    desktopMode: 'Vista Desktop',
    newRecipe: 'Nuova Ricetta',
    fat: 'Grassi (Fat)',
    sugars: 'Zuccheri',
    snf: 'SLNG (Solidi Magri Latte)',
    otherSolids: 'Altri Solidi',
    totalSolids: 'Solidi Totali (ST)',
    water: 'Acqua',
    pod: 'Dolcezza (POD)',
    pac: 'Anticongelante (PAC)',
    freezingPoint: 'Punto di congelamento',
    targetTemp: 'Vetrina',
    weight: 'Peso, g',
    share: 'Quota %',
    totalWeight: 'Massa Totale Miscela',
    targetZone: 'Intervallo ideale',
    colIngredient: 'Ingrediente',
    colCategory: 'Categoria',
    colWeight: 'Peso (g)',
    colShare: 'Quota %',
    colFat: 'Grassi %',
    colSnf: 'SLNG %',
    colSugars: 'Zuccheri %',
    colOtherSolids: 'Altri %',
    colPod: 'POD',
    colPac: 'PAC',
    colActions: 'Azioni',
    unitGram: 'g',
    shortFat: 'Gr.',
    shortSnf: 'SLNG',
    shortSugars: 'Zucch.',
    shortOtherSolids: 'Altri',
    shortTotalSolids: 'ST',
    itemsShort: 'ingr.',
    podIndexDesc: 'indice (saccarosio = 100)',
    scalerRatioLabel: 'Rapporto di scala',
    pwaOfflineBadge: 'PWA Autonoma · Pronto Offline',
    downloadGitHubZipBtn: 'Scarica ZIP per GitHub (Build APK)',
    downloadGitHubZipDesc: 'Progetto pronto con GitHub Actions per generare automaticamente il file APK Android',
    pageTitle: 'Gelato Bilanciamento — Calcolatore Professionale Gelateria',
    delete: 'Elimina',
    edit: 'Modifica',
    cancel: 'Annulla',
    apply: 'Applica',
    close: 'Chiudi',
    copied: 'Copiato!',
    copyLink: 'Copia link',
    print: 'Stampa',
    statusIdeal: 'Ideale',
    statusLow: 'Sotto soglia',
    statusHigh: 'Sopra soglia',
    balancedVerdict: 'Bilanciamento perfetto! Tutti i parametri rientrano nella norma per la temperatura di vetrina. Struttura cremosa e spatolabile.',
    unbalancedVerdict: 'La ricetta richiede correzione.',
    autoSaved: 'Salvataggio auto',
    tempSliderLabel: 'Temperatura di servizio in vetrina',
    phaseState: 'Fase fisica a',
    frozenWater: 'Acqua congelata (Cristalli di ghiaccio)',
    liquidSyrup: 'Sciroppo liquido concentrato',
    crystallizationStart: 'Inizio congelamento',
    idealFrozenRange: 'Percentuale ideale di acqua congelata per la spatolatura: 72% – 78%.',
    textureIdeal: 'Consistenza perfetta (Cremoso)',
    textureSoft: 'Molto morbido / Delicato',
    textureTooSoft: 'Troppo morbido (cola)',
    textureFirm: 'Compatto / Consistente',
    textureTooHard: 'Troppo duro / Ghiacciato',
    sugarSolver: 'Bilancia Zuccheri',
    sugarSolverDesc: 'Risolutore saccarosio e destrosio per PAC esatto',
    scaleBatch: 'Scala Miscela',
    scaleBatchDesc: 'Ricalcolo peso per carapina o vaschetta',
    techCard: 'Scheda Tecnica',
    techCardDesc: 'Stampa / esporta scheda di produzione',
    glossary: 'Glossario',
    glossaryDesc: 'Teoria e formule POD & PAC Carpigiani',
    presetsTitle: 'Ricette Classiche di Gelateria',
    profileTitle: 'Profilo termico della vetrina',
    saveRecipe: 'Salva nei preferiti',
    exportJSON: 'Esporta file (.json)',
    importJSON: 'Importa file (.json)',
    resetDefault: 'Ripristina ricetta base',
    resetConfirm: 'Ripristinare la ricetta al valore standard?',
    androidGuide: 'Installa su Android',
    addIngredient: '+ Ingrediente',
    createCustomProduct: '+ Crea nuovo ingrediente',
    notes: 'Note',
    notesTitle: 'Note del Maestro Gelatiere',
    notesPlaceholder: 'Temperatura di maturazione, tempo di pastorizzazione...',
    done: 'Fatto',
    ingredient: 'Ingrediente',
    baseBadge: 'Base',
    customBadge: 'Pers.',
    searchPlaceholder: 'Cerca ingrediente (latte, panna, saccarosio...)...',
    noResults: 'Nessun ingrediente trovato',
    recipeEmpty: 'La ricetta è vuota',
    addFirstIngredient: 'Aggiungi il primo ingrediente',
    theme: 'Tema grafico',
    themeLight: 'Chiaro',
    themeDark: 'Scuro',
    language: 'Lingua dell’applicazione',
    catAll: 'Tutti',
    catDairy: 'Latticini',
    catSugars: 'Zuccheri',
    catPastes: 'Paste secche',
    catChocolate: 'Cioccolato',
    catFruits: 'Frutta',
    catEggs: 'Uova',
    catStabilizers: 'Basi e Stab.',
    pacLowAdvice: 'PAC troppo basso (il gelato risulterà troppo duro a -14°C). ',
    pacHighAdvice: 'PAC troppo alto (il gelato si scioglierà troppo velocemente). ',
    podHighAdvice: 'POD troppo alto (troppo dolce al palato). ',
    clickAutoBalance: 'Clicca su "Bilancia Zuccheri" per calcolare saccarosio e destrosio.',
    solverTitle: 'Risolutore Automatico degli Zuccheri',
    solverDesc: 'Calcolo esatto del rapporto tra Saccarosio e Destrosio per raggiungere il PAC target mantenendo il peso del mix',
    solverTargetPac: 'PAC obiettivo del profilo',
    solverCurrentPac: 'PAC attuale della miscela',
    solverCurrentPod: 'POD attuale (Dolcezza)',
    solverSucroseCurrent: 'Saccarosio nella ricetta',
    solverDextroseCurrent: 'Destrosio nella ricetta',
    solverBalancedTitle: 'Valori ricalcolati degli zuccheri:',
    solverApplyButton: 'Applica le nuove proporzioni di zuccheri',
    solverFormulaDesc: 'Algoritmo a 2 variabili: preserva il peso totale e centra con precisione il PAC di vetrina.',
    solverNotNeeded: 'Il PAC rientra già nel range ideale!',
    solverNoSugars: 'Per usare il risolutore, la ricetta deve contenere saccarosio e/o destrosio.',
    scalerTitle: 'Scala Quantità Miscela',
    scalerDesc: 'Ricalcolo proporzionale di tutti gli ingredienti in base alla capacità della vaschetta o mantecatore',
    scalerCurrentWeight: 'Peso attuale miscela',
    scalerTargetWeight: 'Peso target totale (g)',
    scalerApplyButton: 'Ricalcola ingredienti',
    scalerPresetsLabel: 'Scelta rapida formato:',
    scalerPreset1kg: '1 kg (1000 g)',
    scalerPreset2kg: '2 kg (2000 g)',
    scalerPreset3kg: '3 kg (3000 g)',
    scalerPreset4kg: '4 kg (Vaschetta standard 5L)',
    scalerPreset5kg: '5 kg (Cilindro mantecatore)',
    customModalTitle: 'Nuovo Ingrediente Personalizzato',
    customModalDesc: 'Inserisci i valori analitici dalla Scheda Tecnica ufficiale del produttore',
    customNameLabel: 'Nome ingrediente',
    customNamePlaceholder: 'Es: Latte fresco alta qualità 3.8%',
    customNameItLabel: 'Nome italiano',
    customNameItPlaceholder: 'Latte fresco alta qualità',
    customCategoryLabel: 'Categoria materia prima',
    customFatLabel: 'Grassi (%)',
    customSnfLabel: 'SLNG (%)',
    customSugarsLabel: 'Zuccheri (%)',
    customOtherSolidsLabel: 'Altri solidi (%)',
    customPodLabel: 'Potere Dolcificante (POD)',
    customPacLabel: 'Potere Anticongelante (PAC)',
    customNotesLabel: 'Note e caratteristiche',
    customTotalSolidsPreview: 'Solidi Totali (ST):',
    customWaterPreview: 'Acqua (H2O):',
    customSaveButton: 'Salva ingrediente nel ricettario',
    techCardHeader: 'SCHEDA TECNICA DI PRODUZIONE GELATO ARTIGIANALE',
    techCardCategory: 'Profilo termico di vetrina',
    techCardShowcaseTemp: 'Temperatura consigliata vetrina',
    techCardDate: 'Data emissione scheda',
    techCardFormulaSummary: 'Parametri chimico-fisici di bilanciamento',
    techCardPreparationInstructions: 'Istruzioni e ciclo di lavorazione',
    techCardNotesTitle: 'Note tecniche del maestro gelatiere',
    techCardPrintPdf: 'Stampa / Salva in PDF',
    techCardIngredientsTitle: 'Distinta base ingredienti (per partita)',
    techCardAverages: 'TOTALI SCHEDA TECNICA',
    androidGuideTitle: 'Installazione come App su Android',
    androidGuideDesc: 'Utilizzo a schermo intero senza barre del browser',
    androidScanQr: 'Inquadra il codice QR con lo smartphone',
    androidScanQrDesc: 'Punta la fotocamera del cellulare per aprire subito l’applicazione',
    androidDirectLink: 'Collegamento diretto all’applicazione:',
    androidInstructionsTitle: 'Procedura per Google Chrome e Samsung Internet:',
    androidStep1: '1. Apri il link con Google Chrome sul tuo smartphone.',
    androidStep2: '2. Tocca i tre puntini in alto a destra (⋮).',
    androidStep3: '3. Seleziona "Installa app" oppure "Aggiungi a schermata Home".',
    androidInstallDirectBtn: 'Installa applicazione con un tocco',
    androidInstalledBadge: 'Applicazione già installata',
    glossaryModalTitle: 'Scienza del Gelato Artigianale',
    glossaryModalSubtitle: 'I principi fondamentali del bilanciamento classico italiano (Bilanciamento)',
    managerTitle: 'Banca Dati Ingredienti Gelateria',
    managerSubtitle: 'Schede analitiche: Grassi, SLNG, Zuccheri, POD e PAC',
    managerSearchPlaceholder: 'Cerca per nome o categoria...',
    managerFilterCategory: 'Filtra per categoria',
    managerAddBtn: '+ Ingrediente personalizzato',
    managerDeleteConfirm: 'Eliminare questo ingrediente personalizzato?',
    managerCustomTag: 'Personalizzato',
    managerBaseTag: 'Base',
    simulatorTitle: 'Simulatore di Struttura e Vetrina',
    simulatorSubtitle: 'Curva di congelamento dell’acqua e stato di fase della miscela',
    simulatorTempLabel: 'Temperatura vaschetta in vetrina (°C)',
    simulatorStructureTitle: 'Distribuzione di fase alla temperatura selezionata',
    simulatorIceRatio: 'Acqua congelata (Cristalli di ghiaccio)',
    simulatorSyrupRatio: 'Fase liquida (Sciroppo concentrato)',
    simulatorTextureVerdict: 'Valutazione della spatolabilità:',
    simulatorLactoseWarning: 'Attenzione: rischio sabbiatura da saturazione di lattosio. Ridurre i solidi magri del latte (SLNG).',
  },
  es: {
    appTitle: 'Gelato Bilanciamento',
    appSubtitle: 'Pro Lab',
    tabRecipe: 'Receta',
    tabBalance: 'Balance',
    tabShowcase: 'Vitrina',
    tabTools: 'Acciones',
    tabIngredients: 'Ingredientes',
    phoneMode: 'Móvil',
    desktopMode: 'Vista Escritorio',
    newRecipe: 'Nueva Receta',
    fat: 'Grasas (Fat)',
    sugars: 'Azúcares',
    snf: 'SLNG (Sólidos lácteos)',
    otherSolids: 'Otros Sólidos',
    totalSolids: 'Sólidos Totales (ST)',
    water: 'Agua',
    pod: 'Poder Dulzor (POD)',
    pac: 'Anticongelante (PAC)',
    freezingPoint: 'Punto de congelación',
    targetTemp: 'Vitrina',
    weight: 'Peso, g',
    share: 'Cuota %',
    totalWeight: 'Masa Total del Mix',
    targetZone: 'Rango objetivo',
    colIngredient: 'Ingrediente',
    colCategory: 'Categoría',
    colWeight: 'Peso (g)',
    colShare: 'Cuota %',
    colFat: 'Grasa %',
    colSnf: 'SLNG %',
    colSugars: 'Azúcar %',
    colOtherSolids: 'Otros %',
    colPod: 'POD',
    colPac: 'PAC',
    colActions: 'Acciones',
    unitGram: 'g',
    shortFat: 'Grasa',
    shortSnf: 'SLNG',
    shortSugars: 'Azúcar',
    shortOtherSolids: 'Otros',
    shortTotalSolids: 'ST',
    itemsShort: 'ingr.',
    podIndexDesc: 'índice (sacarosa = 100)',
    scalerRatioLabel: 'Factor de escala',
    pwaOfflineBadge: 'PWA Autónoma · Funciona Sin Conexión',
    downloadGitHubZipBtn: 'Descargar ZIP para GitHub (Crear APK)',
    downloadGitHubZipDesc: 'Proyecto listo con GitHub Actions para compilar el archivo APK automáticamente',
    pageTitle: 'Gelato Bilanciamento — Calculadora Profesional de Helado',
    delete: 'Eliminar',
    edit: 'Editar',
    cancel: 'Cancelar',
    apply: 'Aplicar',
    close: 'Cerrar',
    copied: '¡Copiado!',
    copyLink: 'Copiar enlace',
    print: 'Imprimir',
    statusIdeal: 'Óptimo',
    statusLow: 'Bajo rango',
    statusHigh: 'Sobre rango',
    balancedVerdict: '¡Equilibrio perfecto! Todos los parámetros están en el rango ideal para la vitrina. Textura cremosa y fácil de espatular.',
    unbalancedVerdict: 'La receta requiere ajuste.',
    autoSaved: 'Autoguardado',
    tempSliderLabel: 'Temperatura de servicio en vitrina',
    phaseState: 'Estado de fase a',
    frozenWater: 'Agua congelada (Cristales de hielo)',
    liquidSyrup: 'Jarabe líquido no congelado',
    crystallizationStart: 'Inicio de congelación',
    idealFrozenRange: 'Rango ideal de agua congelada para servir con espátula: 72% – 78%.',
    textureIdeal: 'Consistencia perfecta (Cremoso)',
    textureSoft: 'Muy suave / Delicado',
    textureTooSoft: 'Demasiado blando (se derrite)',
    textureFirm: 'Firme / Compacto',
    textureTooHard: 'Demasiado duro / Helado',
    sugarSolver: 'Balance Azúcares',
    sugarSolverDesc: 'Cálculo de sacarosa y dextrosa para PAC exacto',
    scaleBatch: 'Escalar Lote',
    scaleBatchDesc: 'Recalcular peso según capacidad de la mantecadora',
    techCard: 'Ficha Técnica',
    techCardDesc: 'Imprimir / exportar ficha de producción',
    glossary: 'Glosario',
    glossaryDesc: 'Teoría y fórmulas POD & PAC',
    presetsTitle: 'Recetas Maestras de Helado',
    profileTitle: 'Perfil de temperatura de vitrina',
    saveRecipe: 'Guardar en favoritos',
    exportJSON: 'Exportar archivo (.json)',
    importJSON: 'Importar archivo (.json)',
    resetDefault: 'Restablecer a la base',
    resetConfirm: '¿Restablecer la receta a la formulación maestra?',
    androidGuide: 'Instalar en Android',
    addIngredient: '+ Ingrediente',
    createCustomProduct: '+ Crear nuevo ingrediente',
    notes: 'Notas',
    notesTitle: 'Notas del Maestro Heladero',
    notesPlaceholder: 'Temperatura de maduración, tiempo de pasteurización...',
    done: 'Listo',
    ingredient: 'Ingrediente',
    baseBadge: 'Base',
    customBadge: 'Pers.',
    searchPlaceholder: 'Buscar ingrediente (leche, nata, azúcar...)...',
    noResults: 'No se encontraron ingredientes',
    recipeEmpty: 'La receta está vacía',
    addFirstIngredient: 'Agregar primer ingrediente',
    theme: 'Tema visual',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    language: 'Idioma de la aplicación',
    catAll: 'Todos',
    catDairy: 'Lácteos',
    catSugars: 'Azúcares',
    catPastes: 'Pastas secas',
    catChocolate: 'Chocolate',
    catFruits: 'Frutas',
    catEggs: 'Huevos',
    catStabilizers: 'Bases y Estab.',
    pacLowAdvice: 'PAC demasiado bajo (el helado estará muy duro a -14°C). ',
    pacHighAdvice: 'PAC demasiado alto (el helado se derretirá muy rápido). ',
    podHighAdvice: 'POD demasiado alto (exceso de dulzor). ',
    clickAutoBalance: 'Haz clic en "Balance Azúcares" para equilibrar sacarosa y dextrosa.',
    solverTitle: 'Equilibrador Automático de Azúcares',
    solverDesc: 'Resuelve la proporción exacta de Sacarosa y Dextrosa para el PAC objetivo manteniendo los gramos de la partida',
    solverTargetPac: 'PAC objetivo del perfil',
    solverCurrentPac: 'PAC actual del mix',
    solverCurrentPod: 'POD actual (Dulzor)',
    solverSucroseCurrent: 'Sacarosa en la receta',
    solverDextroseCurrent: 'Dextrosa en la receta',
    solverBalancedTitle: 'Valores recalculados de azúcares:',
    solverApplyButton: 'Aplicar nueva proporción de azúcares',
    solverFormulaDesc: 'Algoritmo de 2 variables: conserva el peso total de azúcares y ajusta al milímetro el PAC de vitrina.',
    solverNotNeeded: '¡El PAC ya se encuentra en el rango objetivo!',
    solverNoSugars: 'Para usar el equilibrador, la receta debe incluir sacarosa y/o dextrosa.',
    scalerTitle: 'Escalar Partida / Mix',
    scalerDesc: 'Cálculo proporcional de todos los ingredientes según la cubeta o capacidad de la mantecadora',
    scalerCurrentWeight: 'Peso actual del mix',
    scalerTargetWeight: 'Peso objetivo total (g)',
    scalerApplyButton: 'Recalcular receta',
    scalerPresetsLabel: 'Capacidades estándar:',
    scalerPreset1kg: '1 kg (1000 g)',
    scalerPreset2kg: '2 kg (2000 g)',
    scalerPreset3kg: '3 kg (3000 g)',
    scalerPreset4kg: '4 kg (Cubeta estándar 5L)',
    scalerPreset5kg: '5 kg (Cilindro mantecadora)',
    customModalTitle: 'Agregar Materia Prima Personalizada',
    customModalDesc: 'Introduce los valores analíticos según la Ficha Técnica oficial del fabricante',
    customNameLabel: 'Nombre del ingrediente',
    customNamePlaceholder: 'Ej: Leche fresca de granja 4%',
    customNameItLabel: 'Nombre en italiano (opcional)',
    customNameItPlaceholder: 'Latte intero fattoria',
    customCategoryLabel: 'Categoría de ingrediente',
    customFatLabel: 'Grasas (%)',
    customSnfLabel: 'SLNG (%)',
    customSugarsLabel: 'Azúcares (%)',
    customOtherSolidsLabel: 'Otros sólidos (%)',
    customPodLabel: 'Poder Dulzor (POD)',
    customPacLabel: 'Poder Anticongelante (PAC)',
    customNotesLabel: 'Notas y características',
    customTotalSolidsPreview: 'Extracto Seco Total (EST):',
    customWaterPreview: 'Agua (H2O):',
    customSaveButton: 'Guardar ingrediente en la biblioteca',
    techCardHeader: 'FICHA TÉCNICA DE PRODUCCIÓN HELADO ARTESANAL',
    techCardCategory: 'Perfil de vitrina',
    techCardShowcaseTemp: 'Temperatura recomendada de servicio',
    techCardDate: 'Fecha de emisión',
    techCardFormulaSummary: 'Parámetros físico-químicos del equilibrio',
    techCardPreparationInstructions: 'Protocolo de elaboración (Paso a paso)',
    techCardNotesTitle: 'Notas técnicas del maestro heladero',
    techCardPrintPdf: 'Imprimir / Guardar en PDF',
    techCardIngredientsTitle: 'Escandallo y materias primas (por lote)',
    techCardAverages: 'TOTALES FICHA TÉCNICA',
    androidGuideTitle: 'Instalar Aplicación en Android',
    androidGuideDesc: 'Ejecutar en pantalla completa como aplicación nativa sin barra del navegador',
    androidScanQr: 'Escanea el código QR con tu móvil',
    androidScanQrDesc: 'Apunta con la cámara de tu smartphone para abrir la app al instante',
    androidDirectLink: 'Enlace directo a la aplicación:',
    androidInstructionsTitle: 'Pasos para Google Chrome y Samsung Internet:',
    androidStep1: '1. Abre el enlace con Google Chrome en tu smartphone.',
    androidStep2: '2. Pulsa en el menú de los tres puntos (⋮) arriba a la derecha.',
    androidStep3: '3. Selecciona "Instalar aplicación" o "Añadir a la pantalla de inicio".',
    androidInstallDirectBtn: 'Instalar app en 1 toque',
    androidInstalledBadge: 'Aplicación ya instalada',
    glossaryModalTitle: 'Ciencia del Helado Artesanal (Scienza del Gelato)',
    glossaryModalSubtitle: 'Principios italianos de equilibrio y balance (Bilanciamento)',
    managerTitle: 'Base de Datos de Ingredientes de Heladería',
    managerSubtitle: 'Especificaciones analíticas: Grasas, SLNG, Azúcares, POD y PAC',
    managerSearchPlaceholder: 'Buscar por nombre o categoría...',
    managerFilterCategory: 'Filtrar por categoría',
    managerAddBtn: '+ Ingrediente propio',
    managerDeleteConfirm: '¿Eliminar este ingrediente personalizado?',
    managerCustomTag: 'Propio',
    managerBaseTag: 'Base',
    simulatorTitle: 'Simulador de Textura y Vitrina',
    simulatorSubtitle: 'Curva crioscópica de congelación del agua y distribución de fases',
    simulatorTempLabel: 'Temperatura en la cubeta de la vitrina (°C)',
    simulatorStructureTitle: 'Distribución de fase a la temperatura seleccionada',
    simulatorIceRatio: 'Agua congelada (Cristales de hielo)',
    simulatorSyrupRatio: 'Fase líquida (Jarabe concentrado)',
    simulatorTextureVerdict: 'Evaluación del espatulado (Spatolabilità):',
    simulatorLactoseWarning: 'Atención: alto riesgo de arenosidad por cristalización de lactosa. Reducir los sólidos lácteos (SLNG).',
  },
};

export const LANGUAGE_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];
