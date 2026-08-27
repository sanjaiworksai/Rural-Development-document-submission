export interface ModuleThemeConfig {
  id: number;
  name: string;
  // Border & Glow
  borderColor: string;
  hoverBorderColor: string;
  glowColor: string;
  // Badge / Code pill
  badgeBg: string;
  badgeText: string;
  badgeRing: string;
  // Category pill
  categoryBg: string;
  categoryText: string;
  categoryBorder: string;
  // Subtitle accent text
  accentText: string;
  // Card background gradient
  cardBgGradient: string;
  completedCardBgGradient: string;
  // Icon / Button theme
  buttonGradient: string;
  buttonHoverGradient: string;
  iconBg: string;
  iconColor: string;
  // Light bar accent at top of card
  topAccentBar: string;
}

export const MODULE_THEMES: Record<number, ModuleThemeConfig> = {
  1: {
    // MOD-01: Cyan Glow Wave
    id: 1,
    name: 'Cyan Luminous',
    borderColor: 'border-cyan-200/90',
    hoverBorderColor: 'hover:border-cyan-400',
    glowColor: 'hover:shadow-cyan-500/15',
    badgeBg: 'bg-gradient-to-r from-cyan-600 to-teal-600',
    badgeText: 'text-white',
    badgeRing: 'ring-cyan-400/30',
    categoryBg: 'bg-cyan-50/90',
    categoryText: 'text-cyan-800',
    categoryBorder: 'border-cyan-200/70',
    accentText: 'text-cyan-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-cyan-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-cyan-50/60 via-teal-50/30 to-white',
    buttonGradient: 'from-cyan-600 to-teal-600',
    buttonHoverGradient: 'hover:from-cyan-700 hover:to-teal-700',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    topAccentBar: 'from-cyan-400 via-teal-400 to-cyan-500',
  },
  2: {
    // MOD-02: Electric Blue Wave
    id: 2,
    name: 'Electric Blue',
    borderColor: 'border-blue-200/90',
    hoverBorderColor: 'hover:border-blue-400',
    glowColor: 'hover:shadow-blue-500/15',
    badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    badgeText: 'text-white',
    badgeRing: 'ring-blue-400/30',
    categoryBg: 'bg-blue-50/90',
    categoryText: 'text-blue-800',
    categoryBorder: 'border-blue-200/70',
    accentText: 'text-blue-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-blue-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-white',
    buttonGradient: 'from-blue-600 to-indigo-600',
    buttonHoverGradient: 'hover:from-blue-700 hover:to-indigo-700',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    topAccentBar: 'from-blue-400 via-sky-400 to-blue-500',
  },
  3: {
    // MOD-03: Lavender Violet Wave
    id: 3,
    name: 'Lavender Violet',
    borderColor: 'border-purple-200/90',
    hoverBorderColor: 'hover:border-purple-400',
    glowColor: 'hover:shadow-purple-500/15',
    badgeBg: 'bg-gradient-to-r from-violet-600 to-purple-600',
    badgeText: 'text-white',
    badgeRing: 'ring-purple-400/30',
    categoryBg: 'bg-purple-50/90',
    categoryText: 'text-purple-800',
    categoryBorder: 'border-purple-200/70',
    accentText: 'text-violet-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-purple-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-purple-50/60 via-violet-50/30 to-white',
    buttonGradient: 'from-violet-600 to-purple-600',
    buttonHoverGradient: 'hover:from-violet-700 hover:to-purple-700',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    topAccentBar: 'from-purple-400 via-violet-400 to-purple-500',
  },
  4: {
    // MOD-04: Teal Aqua Stream
    id: 4,
    name: 'Teal Aqua',
    borderColor: 'border-teal-200/90',
    hoverBorderColor: 'hover:border-teal-400',
    glowColor: 'hover:shadow-teal-500/15',
    badgeBg: 'bg-gradient-to-r from-teal-600 to-emerald-600',
    badgeText: 'text-white',
    badgeRing: 'ring-teal-400/30',
    categoryBg: 'bg-teal-50/90',
    categoryText: 'text-teal-800',
    categoryBorder: 'border-teal-200/70',
    accentText: 'text-teal-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-teal-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-teal-50/60 via-emerald-50/30 to-white',
    buttonGradient: 'from-teal-600 to-emerald-600',
    buttonHoverGradient: 'hover:from-teal-700 hover:to-emerald-700',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    topAccentBar: 'from-teal-400 via-cyan-400 to-emerald-400',
  },
  5: {
    // MOD-05: Sky Cerulean
    id: 5,
    name: 'Sky Cerulean',
    borderColor: 'border-sky-200/90',
    hoverBorderColor: 'hover:border-sky-400',
    glowColor: 'hover:shadow-sky-500/15',
    badgeBg: 'bg-gradient-to-r from-sky-600 to-blue-600',
    badgeText: 'text-white',
    badgeRing: 'ring-sky-400/30',
    categoryBg: 'bg-sky-50/90',
    categoryText: 'text-sky-800',
    categoryBorder: 'border-sky-200/70',
    accentText: 'text-sky-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-sky-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-sky-50/60 via-blue-50/30 to-white',
    buttonGradient: 'from-sky-600 to-blue-600',
    buttonHoverGradient: 'hover:from-sky-700 hover:to-blue-700',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    topAccentBar: 'from-sky-400 via-cyan-300 to-sky-500',
  },
  6: {
    // MOD-06: Indigo Aurora
    id: 6,
    name: 'Indigo Aurora',
    borderColor: 'border-indigo-200/90',
    hoverBorderColor: 'hover:border-indigo-400',
    glowColor: 'hover:shadow-indigo-500/15',
    badgeBg: 'bg-gradient-to-r from-indigo-600 to-violet-600',
    badgeText: 'text-white',
    badgeRing: 'ring-indigo-400/30',
    categoryBg: 'bg-indigo-50/90',
    categoryText: 'text-indigo-800',
    categoryBorder: 'border-indigo-200/70',
    accentText: 'text-indigo-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-indigo-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-white',
    buttonGradient: 'from-indigo-600 to-violet-600',
    buttonHoverGradient: 'hover:from-indigo-700 hover:to-violet-700',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    topAccentBar: 'from-indigo-400 via-violet-400 to-blue-400',
  },
  7: {
    // MOD-07: Emerald Mint
    id: 7,
    name: 'Emerald Mint',
    borderColor: 'border-emerald-200/90',
    hoverBorderColor: 'hover:border-emerald-400',
    glowColor: 'hover:shadow-emerald-500/15',
    badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    badgeText: 'text-white',
    badgeRing: 'ring-emerald-400/30',
    categoryBg: 'bg-emerald-50/90',
    categoryText: 'text-emerald-800',
    categoryBorder: 'border-emerald-200/70',
    accentText: 'text-emerald-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-emerald-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-emerald-50/60 via-teal-50/30 to-white',
    buttonGradient: 'from-emerald-600 to-teal-600',
    buttonHoverGradient: 'hover:from-emerald-700 hover:to-teal-700',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    topAccentBar: 'from-emerald-400 via-teal-300 to-cyan-400',
  },
  8: {
    // MOD-08: Cobalt Deep Blue
    id: 8,
    name: 'Cobalt Deep Blue',
    borderColor: 'border-blue-300/90',
    hoverBorderColor: 'hover:border-blue-500',
    glowColor: 'hover:shadow-blue-600/15',
    badgeBg: 'bg-gradient-to-r from-blue-700 to-sky-600',
    badgeText: 'text-white',
    badgeRing: 'ring-blue-400/30',
    categoryBg: 'bg-blue-50/90',
    categoryText: 'text-blue-900',
    categoryBorder: 'border-blue-200/70',
    accentText: 'text-blue-800',
    cardBgGradient: 'bg-gradient-to-b from-white via-blue-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-white',
    buttonGradient: 'from-blue-700 to-sky-600',
    buttonHoverGradient: 'hover:from-blue-800 hover:to-sky-700',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    topAccentBar: 'from-blue-500 via-indigo-400 to-sky-400',
  },
  9: {
    // MOD-09: Ocean Aquamarine
    id: 9,
    name: 'Ocean Aquamarine',
    borderColor: 'border-cyan-300/90',
    hoverBorderColor: 'hover:border-cyan-500',
    glowColor: 'hover:shadow-cyan-600/15',
    badgeBg: 'bg-gradient-to-r from-cyan-700 to-blue-600',
    badgeText: 'text-white',
    badgeRing: 'ring-cyan-400/30',
    categoryBg: 'bg-cyan-50/90',
    categoryText: 'text-cyan-900',
    categoryBorder: 'border-cyan-200/70',
    accentText: 'text-cyan-800',
    cardBgGradient: 'bg-gradient-to-b from-white via-cyan-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-cyan-50/60 via-blue-50/30 to-white',
    buttonGradient: 'from-cyan-700 to-blue-600',
    buttonHoverGradient: 'hover:from-cyan-800 hover:to-blue-700',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-700',
    topAccentBar: 'from-cyan-500 via-teal-400 to-blue-400',
  },
  10: {
    // MOD-10: Iris Royal
    id: 10,
    name: 'Iris Royal',
    borderColor: 'border-violet-200/90',
    hoverBorderColor: 'hover:border-violet-400',
    glowColor: 'hover:shadow-violet-500/15',
    badgeBg: 'bg-gradient-to-r from-violet-600 to-indigo-600',
    badgeText: 'text-white',
    badgeRing: 'ring-violet-400/30',
    categoryBg: 'bg-violet-50/90',
    categoryText: 'text-violet-800',
    categoryBorder: 'border-violet-200/70',
    accentText: 'text-violet-700',
    cardBgGradient: 'bg-gradient-to-b from-white via-violet-50/20 to-white',
    completedCardBgGradient: 'bg-gradient-to-b from-violet-50/60 via-indigo-50/30 to-white',
    buttonGradient: 'from-violet-600 to-indigo-600',
    buttonHoverGradient: 'hover:from-violet-700 hover:to-indigo-700',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    topAccentBar: 'from-violet-400 via-purple-400 to-indigo-400',
  },
};

export const DEFAULT_MODULE_THEME: ModuleThemeConfig = {
  id: 0,
  name: 'Default Cyan',
  borderColor: 'border-cyan-200/90',
  hoverBorderColor: 'hover:border-cyan-400',
  glowColor: 'hover:shadow-cyan-500/15',
  badgeBg: 'bg-gradient-to-r from-cyan-600 to-teal-600',
  badgeText: 'text-white',
  badgeRing: 'ring-cyan-400/30',
  categoryBg: 'bg-cyan-50/90',
  categoryText: 'text-cyan-800',
  categoryBorder: 'border-cyan-200/70',
  accentText: 'text-cyan-700',
  cardBgGradient: 'bg-gradient-to-b from-white via-cyan-50/20 to-white',
  completedCardBgGradient: 'bg-gradient-to-b from-cyan-50/60 via-teal-50/30 to-white',
  buttonGradient: 'from-cyan-600 to-teal-600',
  buttonHoverGradient: 'hover:from-cyan-700 hover:to-teal-700',
  iconBg: 'bg-cyan-50',
  iconColor: 'text-cyan-600',
  topAccentBar: 'from-cyan-400 via-teal-400 to-cyan-500',
};
