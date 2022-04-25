import { ThemeOptions, PaletteOptions } from '@mui/material'

const grey: PaletteOptions['grey'] = {
  50: '#f7f7fd',
  100: '#d3d3d9',
  200: '#bbbbc3',
  300: '#9999a3',
  400: '#7a7a85',
  500: '#4e4e55',
  600: '#38383e',
  700: '#2c2c30',
  800: '#222226',
  900: '#18181b',
}

export const palette: ThemeOptions['palette'] = {
  mode: 'dark',
  tonalOffset: 0.12,
  primary: {
    main: '#6999e7',
  },
  grey,
  background: {
    default: grey[900],
    paper: grey[800],
  },
  text: {
    primary: '#f0f0ff',
    secondary: '#a7a7b4',
    disabled: '#7c7c83',
  },
}
