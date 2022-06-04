import React from 'react'
import {
  Stack,
  OutlinedInput,
  outlinedInputClasses,
  styled,
  InputLabel,
  InputLabelProps,
  OutlinedInputProps,
  FormHelperTextProps,
  FormHelperText,
  Theme,
  SxProps,
  StackProps,
} from '@mui/material'
import { usePinInput, UsePinInputProps } from 'react-pin-input-hook'

const Root = styled('div')({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  verticalAlign: 'top',
})

const Label = styled(InputLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

const Input = styled(OutlinedInput)(({ fullWidth }) => ({
  ...(!fullWidth && {
    maxWidth: 46,
  }),
  [`& .${outlinedInputClasses.input}`]: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
  },
}))

export interface PinInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    UsePinInputProps {
  InputProps?: OutlinedInputProps
  size?: OutlinedInputProps['size']
  readOnly?: OutlinedInputProps['readOnly']
  color?: OutlinedInputProps['color']
  label?: React.ReactNode
  InputLabelProps?: InputLabelProps
  helperText?: React.ReactNode
  FormHelperTextProps?: FormHelperTextProps
  id?: string
  sx?: SxProps<Theme>
  StackProps?: StackProps
  fullWidth?: boolean
}

export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(function PinInput(
  props,
  ref
) {
  const {
    label,
    error,
    InputLabelProps,
    readOnly = false,
    size,
    helperText,
    FormHelperTextProps,
    id,
    sx,
    InputProps,
    StackProps,
    fullWidth = false,
    values,
    actionRef,
    onChange,
    onComplete,
    mask,
    disabled,
    autoFocus,
    defaultValues,
    type,
    otp,
    placeholder,
    ...rest
  } = props
  const { fields, isFocused } = usePinInput({
    values,
    actionRef,
    onChange,
    onComplete,
    mask,
    disabled,
    autoFocus,
    defaultValues,
    type,
    otp,
    placeholder,
    error,
  })

  return (
    <Root ref={ref} sx={sx} {...rest}>
      {label && (
        <Label
          htmlFor={id && `${id}-0`}
          id={id && `${id}-label`}
          focused={isFocused}
          error={error}
          {...InputLabelProps}
        >
          {label}
        </Label>
      )}
      <Stack direction='row' spacing='10px' {...StackProps}>
        {fields.map(({ ref, inputMode, ...restField }, index) => (
          <Input
            key={index}
            {...InputProps}
            inputRef={ref}
            inputProps={{ ...InputProps?.inputProps, inputMode }}
            error={error}
            readOnly={readOnly}
            size={size}
            id={`${id}-${index}`}
            fullWidth={fullWidth}
            {...restField}
          />
        ))}
      </Stack>
      {helperText && (
        <FormHelperText
          id={id && `${id}-helper-text`}
          error={error}
          {...FormHelperTextProps}
          variant='outlined'
        >
          {helperText}
        </FormHelperText>
      )}
    </Root>
  )
})
