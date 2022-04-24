import React from 'react'

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontWeightThin: React.CSSProperties['fontWeight']
    fontWeightBlack: React.CSSProperties['fontWeight']
  }
}
