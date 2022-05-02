import React from 'react'
import { CircularProgress, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import {
  ALLOWED_CHARACTERS_USERNAME_REGEX,
  isUsernameAvailable,
  LOW_LINES_USERNAME_REGEX,
  RANGE_LENGTH_USERNAME_REGEX,
} from 'src/features/login/utils/validations/username-validation'
import { FormValues } from 'src/pages/login/signup'

export type UsernameValidationInputProps = Pick<
  UseControllerProps<FormValues>,
  'control' | 'name'
> &
  TextFieldProps

export function UsernameValidationInput({
  control,
  name: nameProp,
  ...rest
}: UsernameValidationInputProps) {
  const [isPending, setIsPending] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout>()
  const {
    field: { ref, value, onChange, onBlur, name },
    fieldState: { error, isDirty },
  } = useController({
    control,
    name: nameProp,
    defaultValue: '',
    rules: {
      validate: {
        rangeLength(value) {
          const isMatch = RANGE_LENGTH_USERNAME_REGEX.test(value)

          if (!isMatch) {
            stopValidateAvailableUsername()
          }

          return isMatch || 'Имя пользователя должно содержать от 3 до 20 символов.'
        },
        allowedCharacters: (value) => {
          const isMatch = ALLOWED_CHARACTERS_USERNAME_REGEX.test(value)

          if (!isMatch) {
            stopValidateAvailableUsername()
          }

          return (
            isMatch ||
            'Имя пользователя может использовать буквы латинского алфавита, цифры и нижние подчёркивания.'
          )
        },
        lowLines(value) {
          const isMatch = LOW_LINES_USERNAME_REGEX.test(value)

          if (!isMatch) {
            stopValidateAvailableUsername()
          }

          return (
            isMatch ||
            'Имя пользователя не может содержать идущий подряд знак нижнего подчёркивания, начинаться и заканчиваться им.'
          )
        },
        async availableFetch(value) {
          setIsPending(true)

          if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
          }

          const isAvailable = await new Promise<boolean>((resolve) => {
            timerRef.current = setTimeout(() => {
              resolve(isUsernameAvailable(value))
            }, 500)
          })

          setIsPending(false)

          return isAvailable || 'Это имя пользователя недоступно.'
        },
      },
    },
  })

  const stopValidateAvailableUsername = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (isPending) {
      setIsPending(false)
    }
  }

  return (
    <TextField
      inputRef={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      label='Имя пользователя'
      error={!!error}
      InputProps={{
        endAdornment: isPending && (
          <InputAdornment position='end'>
            <CircularProgress size='1em' color='inherit' />
          </InputAdornment>
        ),
      }}
      helperText={
        isPending
          ? 'Проверка имени пользователя.'
          : error
          ? error.message
          : !isDirty &&
            'Имя пользователя может использовать буквы латинского алфавита, цифры и знак нижнего подчёркивания.'
      }
      autoComplete='off'
      {...rest}
    />
  )
}
