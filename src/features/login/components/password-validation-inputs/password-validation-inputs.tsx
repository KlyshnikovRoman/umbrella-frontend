import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { PasswordInput } from 'src/components/password-input'
import {
  RANGE_LENGTH_PASSWORD_REGEX,
  messages,
} from 'src/features/login/utils/validations/password-validation'

export interface PasswordValidationInputsProps {
  passwordProps: TextFieldProps
  repasswordProps: TextFieldProps
}

export function PasswordValidationInputs({
  passwordProps: { name: passwordName, inputProps: passwordInputProps, ...restPassword },
  repasswordProps: { name: repasswordName, inputProps: repasswordInputProps, ...restRepassword },
}: PasswordValidationInputsProps) {
  const {
    getValues,
    trigger,
    formState: { dirtyFields, errors },
  } = useFormContext()

  return (
    <>
      <Controller
        name={passwordName}
        rules={{
          validate(value) {
            if (dirtyFields[repasswordName]) {
              const isPasswordsMatch = value === getValues(repasswordName)

              if (
                (errors[repasswordName] && isPasswordsMatch) ||
                (!errors[repasswordName] && !isPasswordsMatch)
              ) {
                trigger(repasswordName)
              }
            }

            return RANGE_LENGTH_PASSWORD_REGEX.test(value) || messages.rangeLength
          },
        }}
        render={({ field: { ref, ...rest }, fieldState: { error, isDirty } }) => (
          <PasswordInput
            inputRef={ref}
            label='Пароль'
            error={Boolean(error)}
            helperText={error?.message || (!error && !isDirty && messages.rangeLength)}
            autoComplete='off'
            {...restPassword}
            inputProps={{
              'aria-label': 'Создайте надёжный пароль',
              spellCheck: false,
              ...passwordInputProps,
            }}
            {...rest}
          />
        )}
      />
      <Controller
        name={repasswordName}
        rules={{
          validate(value) {
            let errorMessage: string

            if (!value) {
              errorMessage = messages.required
            } else if (value !== getValues(passwordName)) {
              errorMessage = messages.notMatch
            }

            return errorMessage
          },
        }}
        render={({ field: { ref, ...rest }, fieldState: { error, isDirty } }) => (
          <PasswordInput
            inputRef={ref}
            label='Повтор пароля'
            error={Boolean(error)}
            helperText={error?.message || (!error && !isDirty && messages.repeat)}
            autoComplete='off'
            {...restRepassword}
            inputProps={{
              'aria-label': 'Повторите созданный пароль',
              spellCheck: false,
              ...repasswordInputProps,
            }}
            {...rest}
          />
        )}
      />
    </>
  )
}
