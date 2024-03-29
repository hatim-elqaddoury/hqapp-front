import { NbJSThemeOptions } from '@nebular/theme';

const palette = {
  primary: '#ff00fb',
  success: '#00d68f',
  info: '#0095ff',
  warning: '#ffaa00',
  danger: '#ff3d71',
};

const theme = {
  fontMain: 'Comic Sans MS, sans-serif',
  //fontMain: 'Open Sans, sans-serif',
  fontSecondary: 'Raleway, sans-serif',

  bg: '#ffffff',
  bg2: '#f7f9fc',
  bg3: '#edf1f7',
  bg4: '#e4e9f2',

  border: '#ffffff',
  border2: '#f7f9fc',
  border3: '#edf1f7',
  border4: '#e4e9f2',
  border5: '#c5cee0',

  fg: '#8f9bb3',
  fgHeading: '#1a2138',
  fgText: '#1a2138',
  fgHighlight: palette.primary,
  layoutBg: '#f7f9fc',
  separator: '#edf1f7',

  primary: palette.primary,
  success: palette.success,
  info: palette.info,
  warning: palette.warning,
  danger: palette.danger,

  primaryLight: '#ff00fb',
  successLight: '#2ce69b',
  infoLight: '#42aaff',
  warningLight: '#ffc94d',
  dangerLight: '#ff708d',
};

export const DEFAULT_THEME = {
  name: 'default',
  variables: {
    ...theme,

  },
} as NbJSThemeOptions;
