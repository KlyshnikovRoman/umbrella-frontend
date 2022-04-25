import React from 'react'
import { styled, Theme, SxProps } from '@mui/material'

export type RootSVGProps<P = any> = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  sx?: SxProps<Theme>
  ref?: React.Ref<SVGSVGElement>
} & P

export const RootSVG = styled('svg')({
  verticalAlign: 'bottom',
})
