import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { EndAdornment } from './components/end-adornment'

export type PasswordInputProps = {
  isShown?: boolean
  onShownChange?(bool: boolean): void
} & TextFieldProps

export const PasswordInput = React.forwardRef<any, PasswordInputProps>(function PasswordInput(
  props,
  ref
) {
  const { InputProps = {}, isShown: isShownProp, onShownChange, disabled, ...rest } = props
  const [isShownState, setIsShownState] = React.useState<boolean>(false)
  const isControlled = isShownProp !== undefined
  const isShown = isControlled ? isShownProp : isShownState

  const onIconButtonClick = React.useCallback(() => {
    if (isControlled) {
      onShownChange?.(!isShown)
    } else {
      setIsShownState(!isShown)
    }
  }, [isControlled, onShownChange, isShown])

  InputProps.endAdornment = <EndAdornment isShown={isShown} onIconButtonClick={onIconButtonClick} />

  const type = isShown ? 'text' : 'password'

  return <TextField ref={ref} type={type} InputProps={InputProps} disabled={disabled} {...rest} />
})
