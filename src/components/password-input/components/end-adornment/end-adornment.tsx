import React from 'react'
import { IconButton, InputAdornment, useFormControl } from '@mui/material'
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  KeyboardCapslock as KeyboardCapslockIcon,
} from '@mui/icons-material'
import { CapsLockIndicator } from 'src/components/caps-lock-indicator'

export interface EndAdornmentProps {
  isShown: boolean
  onIconButtonClick(): void
}

function prevent(event: React.MouseEvent) {
  event.preventDefault()
}

export function EndAdornment({ isShown, onIconButtonClick }: EndAdornmentProps) {
  const { focused, disabled } = useFormControl() || {}
  const Icon = isShown ? VisibilityOffIcon : VisibilityIcon

  return (
    <>
      <InputAdornment onMouseDown={prevent} onMouseUp={prevent} position='end'>
        <CapsLockIndicator>
          {(isCapsLock) => (
            <KeyboardCapslockIcon
              sx={{
                visibility: focused && isCapsLock ? 'visible' : 'hidden',
              }}
            />
          )}
        </CapsLockIndicator>
      </InputAdornment>
      <IconButton
        tabIndex={focused ? 0 : -1}
        aria-label='Показать/скрыть пароль'
        onClick={onIconButtonClick}
        onMouseDown={prevent}
        onMouseUp={prevent}
        edge='end'
        disabled={disabled}
      >
        <Icon />
      </IconButton>
    </>
  )
}
