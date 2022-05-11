import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PasswordInput } from 'src/components/password-input'
import { rhfTransformRegister } from 'src/utils/rhf-transform-register'
import {
  RANGE_LENGTH_PASSWORD_REGEX,
  messages,
} from 'src/features/login/utils/validations/password-validation'

export interface PasswordValidationInputsProps {
  passwordName: string
  repasswordName: string
  passwordInputProps?: TextFieldProps
  repasswordInputProps?: TextFieldProps
  disabled?: boolean
}

export function PasswordValidationInputs({
  passwordName,
  repasswordName,
  passwordInputProps,
  repasswordInputProps,
  disabled = false,
}: PasswordValidationInputsProps) {
  const { register, getValues, getFieldState, trigger, formState } = useFormContext()
  const passwordState = getFieldState(passwordName, formState)
  const repasswordState = getFieldState(repasswordName, formState)

  const passwordRegisterProps = rhfTransformRegister(
    register(passwordName, {
      disabled,
      validate(value) {
        if (repasswordState.isDirty) {
          const isPasswordsMatch = value === getValues(repasswordName)

          if (
            (repasswordState.error && isPasswordsMatch) ||
            (!repasswordState.error && !isPasswordsMatch)
          ) {
            trigger(repasswordName)
          }
        }

        return RANGE_LENGTH_PASSWORD_REGEX.test(value) || messages.rangeLength
      },
    })
  )
  const repasswordRegisterProps = rhfTransformRegister(
    register(repasswordName, {
      disabled,
      validate(value) {
        let errorMessage: string

        if (!value) {
          errorMessage = messages.required
        } else if (value !== getValues(passwordName)) {
          errorMessage = messages.notMatch
        }

        return errorMessage
      },
    })
  )

  return (
    <>
      <PasswordInput
        label='Пароль'
        error={Boolean(passwordState.error)}
        helperText={passwordState.error?.message || messages.rangeLength}
        autoComplete='off'
        {...passwordInputProps}
        inputProps={{
          'aria-label': 'Создайте надёжный пароль',
          spellCheck: false,
          ...passwordInputProps.inputProps,
        }}
        {...passwordRegisterProps}
      />
      <PasswordInput
        label='Повтор пароля'
        error={Boolean(repasswordState.error)}
        helperText={repasswordState.error?.message || messages.repeat}
        autoComplete='off'
        {...repasswordInputProps}
        inputProps={{
          'aria-label': 'Повторите созданный пароль',
          spellCheck: false,
          ...repasswordInputProps.inputProps,
        }}
        {...repasswordRegisterProps}
      />
    </>
  )
}
