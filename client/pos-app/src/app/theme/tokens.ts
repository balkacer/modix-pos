export const tokens = {
  colors: {
    bg: '#f3f4f6',
    surface: '#ffffff',
    surfaceAlt: '#f9fafb',
    border: '#e5e7eb',
    borderStrong: '#d1d5db',
    text: '#111827',
    textMuted: '#6b7280',
    primary: '#111827',
    primaryHover: '#1f2937',
    accent: '#14b8a6',
    accentSoft: '#ccfbf1',
    successBg: '#dcfce7',
    successText: '#166534',
    warningBg: '#fef3c7',
    warningText: '#92400e',
    dangerBg: '#fee2e2',
    dangerText: '#991b1b',
    dangerSolid: '#b91c1c',
    overlay: 'rgba(17, 24, 39, 0.45)'
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    pill: 999
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32
  },
  shadows: {
    sm: '0 4px 10px rgba(0,0,0,0.04)',
    md: '0 8px 24px rgba(0,0,0,0.06)',
    lg: '0 18px 40px rgba(0,0,0,0.10)'
  },
  typography: {
    title: 20,
    section: 18,
    subtitle: 14,
    body: 14,
    label: 13,
    caption: 12
  },
  layout: {
    maxWidth: 1600,
    sidebarWidth: 420,
    headerHeight: 72
  }
} as const;
