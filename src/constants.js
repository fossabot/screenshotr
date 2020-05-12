export const GITHUB_LINK = 'https://github.com/csandman/screenshotr';

export const RESOLUTION_OPTIONS = [
  {
    label: '1024 × 576',
    value: {
      height: 576,
      width: 1024,
    },
  },
  {
    label: '1152 × 648',
    value: {
      height: 648,
      width: 1152,
    },
  },
  {
    label: '1280 × 720',
    value: {
      height: 720,
      width: 1280,
    },
  },
  {
    label: '1366 × 768',
    value: {
      height: 768,
      width: 1366,
    },
  },
  {
    label: '1600 × 900',
    value: {
      height: 900,
      width: 1600,
    },
  },
  {
    label: '1920 × 1080',
    value: {
      height: 1080,
      width: 1920,
    },
  },
  {
    label: '2560 × 1440',
    value: {
      height: 1440,
      width: 2560,
    },
  },
  {
    label: '3840 × 2160',
    value: {
      height: 2160,
      width: 3840,
    },
  },
];

export const STYLE_OPTIONS = [
  {
    value: 'apple',
    label: 'Mac OS',
  },
  {
    value: 'windows10',
    label: 'Windows 10',
  },
  {
    value: 'mondrian',
    label: 'Mondrian',
  },
  {
    value: 'windows98',
    label: 'Windows 98',
  },
  {
    value: 'no-browser',
    label: 'None',
  },
];

export const SHADOW_OPTIONS = [
  {
    value: 'shadow-none',
    label: 'None',
  },
  {
    value: 'shadow-small',
    label: 'Small',
  },
  {
    value: 'shadow-large',
    label: 'Large',
  },
];

export const DARK_LIGHT_OPTIONS = [
  {
    value: 'dark',
    label: 'Dark',
  },
  {
    value: 'light',
    label: 'Light',
  },
];

export const ADDRESS_BAR_OPTIONS = [
  {
    value: 'address-none',
    label: 'None',
  },
  {
    value: 'address-no-favicon',
    label: 'Simple',
  },
  {
    value: 'address-full',
    label: 'Favicon',
  },
];

export const DEFAULT_OPTIONS = {
  resolution: RESOLUTION_OPTIONS[3],
  style: STYLE_OPTIONS[0],
  verticalPadding: 75,
  horizontalPadding: 75,
  outputWidth: 1000,
  background: {
    background: 'transparent',
  },
  controlScale: 1,
  shadow: 'shadow-small',
  darkLight: 'dark',
  address: 'address-full',
  maxOutputWidth: 1000,
  isEyeDropperActive: false,
};

export const BACKGROUND_TYPES = [
  {
    label: 'Solid',
    value: 'solid',
  },
  {
    label: 'Gradient',
    value: 'gradient',
  },
  {
    label: 'Stripes',
    value: 'stripes',
  },
];
