// Premium AI Background Marketplace - Design System
export const Colors = {
  // Primary palette
  primary: '#8B5CF6',       // Soft purple
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  
  // Secondary palette
  secondary: '#F472B6',     // Soft pink
  secondaryLight: '#F9A8D4',
  
  // Accent colors
  peach: '#FBBF84',
  lavender: '#C4B5FD',
  skyBlue: '#7DD3FC',
  softPink: '#FCA5D0',
  mintGreen: '#6EE7B7',
  coral: '#FB923C',
  
  // Backgrounds
  background: '#FAFBFE',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F7FF',
  surfaceTertiary: '#FFF5F7',
  cardBg: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1A1A2E',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textOnPrimary: '#FFFFFF',
  
  // Borders
  border: '#F1F0FB',
  borderLight: '#F8F7FF',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Gradients (start, end)
  gradientPrimary: ['#4F7DFF', '#FF2E93'],
  gradientSecondary: ['#955BFF', '#FF2E93'],
  gradientHero: ['#4F7DFF', '#955BFF', '#FF2E93'],
  gradientButton: ['#C079FF', '#8F6EFF', '#5E63FF'],
  gradientAccent: ['#7DD3FC', '#C4B5FD'],
  gradientMint: ['#6EE7B7', '#7DD3FC'],
  
  // Shadows
  shadowColor: '#AA50FF',
  shadowLight: 'rgba(170, 80, 255, 0.08)',
  shadowMedium: 'rgba(170, 80, 255, 0.15)',
};

export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40,
  },
  lineHeights: {
    xs: 16,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 40,
    hero: 48,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
  glow: {
    shadowColor: '#AA50FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  premiumCard: {
    shadowColor: 'rgba(170, 80, 255, 1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  premiumButton: {
    shadowColor: '#5E63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  }
};

export default Colors;
