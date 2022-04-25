import React from 'react'
import { TextField, TextFieldProps, IconButton } from '@mui/material'
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'

export type HiddenPasswordInputProps = {
  isShow?: boolean
  onShow?(bool: boolean): void
} & TextFieldProps

export const HiddenPasswordInput = React.forwardRef<any, HiddenPasswordInputProps>(
  function HiddenPasswordInput(props, ref) {
    const { InputProps = {}, isShow: isShowProp, onShow, ...rest } = props
    const [isShowSate, setIsShowSate] = React.useState<boolean>(false)
    const isControlled = isShowProp !== undefined
    const isShow = isControlled ? isShowProp : isShowSate

    const onIconButtonClick = React.useCallback(() => {
      if (isControlled) {
        onShow?.(!isShow)
      } else {
        setIsShowSate(!isShow)
      }
    }, [onShow, isShow])

    const Icon = isShow ? VisibilityOffIcon : VisibilityIcon

    InputProps.endAdornment = (
      <IconButton onClick={onIconButtonClick} edge='end'>
        <Icon />
      </IconButton>
    )

    const type = isShow ? 'text' : 'password'

    return <TextField ref={ref} type={type} InputProps={InputProps} {...rest} />
  }
)
