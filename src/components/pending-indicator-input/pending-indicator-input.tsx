import React from 'react'
import { CircularProgress, InputAdornment, TextField, TextFieldProps } from '@mui/material'

export type PendingIndicatorInputProps = {
  isPending: boolean
} & TextFieldProps

export const PendingIndicatorInput = React.forwardRef<any, PendingIndicatorInputProps>(
  function PendingIndicatorInput(props, ref) {
    const { isPending, ...rest } = props
    const endAdornment = isPending && (
      <InputAdornment position='end'>
        <CircularProgress size='1em' color='inherit' />
      </InputAdornment>
    )

    return <TextField ref={ref} InputProps={{ endAdornment }} {...rest} />
  }
)
