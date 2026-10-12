// Design tokens ported 1:1 from the FES Form Builder web app (:root CSS variables)
export const colors = {
  brandBlue: '#1F4397',
  brandBlueDark: '#16357D',
  brandGreen: '#39A248',

  metricValue: '#2B3674',
  metricLabel: 'rgba(43,54,116,0.72)',
  metricMuted: '#A3AED0',

  textHeading: '#101828',
  textStrong: '#292929',
  textMuted: '#667085',
  textPlaceholder: 'rgba(41,41,41,0.37)',

  surface: '#FFFFFF',
  inputSurface: '#F9FAFB',
  canvas: '#EEF2F9',

  divider: '#C4C4C4',
  borderSubtle: '#E2E8F0',
  inputBorder: 'rgba(41,41,41,0.22)',

  success: '#39A248',
  pending: '#F5A623',
  error: '#EF4444',
  info: '#4318FF',

  // status tints
  successTint: '#E8F5EA',
  pendingTint: '#FFF6E9',
  errorTint: '#FDEEEE',
  blueTint: '#E7EDFB',
  purple: '#7C3AED',
  purpleTint: '#F1ECFE',
};

export const radius = {
  chip: 8,
  control: 12,
  container: 16,
  card: 20,
  pill: 9999,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  float: {
    shadowColor: '#1F4397',
    shadowOpacity: 0.16,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  xs: {
    shadowColor: '#1D293D',
    shadowOpacity: 0.04,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
};

export const font = {
  // React Native ships system fonts; we map the web families to weight choices.
  regular: undefined,
  bold: undefined,
};

// status → badge style map (mirrors .b-s / .b-p / .b-e in the web app)
export const statusStyles = {
  active: { bg: colors.successTint, fg: colors.brandGreen, label: 'Active', icon: 'checkmark-circle' },
  submitted: { bg: colors.successTint, fg: colors.brandGreen, label: 'Submitted', icon: 'checkmark-circle' },
  draft: { bg: colors.pendingTint, fg: '#B26A00', label: 'Draft', icon: 'time-outline' },
  pending: { bg: colors.pendingTint, fg: '#B26A00', label: 'Pending', icon: 'time-outline' },
  archived: { bg: '#F0F1F3', fg: colors.textMuted, label: 'Archived', icon: 'archive-outline' },
};

// program category → Ionicons name + accent (mirrors CAT_ICON / lucide usage)
export const categoryMeta = {
  water: { icon: 'water', label: 'Water Conservation', color: '#2563EB' },
  bio: { icon: 'leaf', label: 'Biodiversity', color: '#16A34A' },
  forest: { icon: 'flower', label: 'Forest Management', color: '#15803D' },
  land: { icon: 'earth', label: 'Land & Soil', color: '#B45309' },
  live: { icon: 'nutrition', label: 'Livelihood', color: '#CA8A04' },
  climate: { icon: 'rainy', label: 'Climate Data', color: '#0891B2' },
};
