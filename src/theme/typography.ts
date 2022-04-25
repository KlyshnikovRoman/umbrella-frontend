import { ThemeOptions } from '@mui/material'

export const typography: ThemeOptions['typography'] = {
  fontFamily: ['GT Walsheim Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  fontWeightThin: 100,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontWeightBlack: 900,
  h1: {
    fontSize: 'clamp(2.625rem, 1.1304rem + 3.9855vw, 4rem)',
    lineHeight: 78 / 70,
  },
  h2: {
    fontSize: 'clamp(2rem, 1.3207rem + 1.8116vw, 2.625rem)',
    lineHeight: 48 / 42,
  },
  h3: {
    fontSize: 'clamp(1.625rem, 0.9457rem + 1.8116vw, 2.25rem)',
    lineHeight: 44 / 36,
  },
  h4: {
    fontSize: 'clamp(1.375rem, 0.8315rem + 1.4493vw, 1.875rem)',
    lineHeight: 42 / 30,
  },
  h5: {
    fontSize: 'clamp(1.25rem, 0.9783rem + 0.7246vw, 1.5rem)',
    lineHeight: 36 / 24,
  },
  h6: {
    fontSize: 'clamp(1.125rem, 0.9891rem + 0.3623vw, 1.25rem)',
    lineHeight: 30 / 20,
  },
}
