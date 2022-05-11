import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  ALLOWED_CHARACTERS_USERNAME_REGEX,
  isUsernameAvailable,
  LOW_LINES_USERNAME_REGEX,
  RANGE_LENGTH_USERNAME_REGEX,
  messages,
} from 'src/features/login/utils/validations/username-validation'
import { rhfTransformRegister } from 'src/utils/rhf-transform-register'

export type UsernameValidationInputProps = {
  helperTextSuccess?: React.ReactNode
} & TextFieldProps

export const UsernameValidationInput = React.forwardRef<any, UsernameValidationInputProps>(
  function UsernameValidationInput(props, ref) {
    const {
      name,
      helperText = messages.allowedCharacters,
      helperTextSuccess,
      inputProps,
      disabled = false,
      ...rest
    } = props
    const { register, formState, getFieldState } = useFormContext()
    const [isPending, setIsPending] = React.useState<boolean>(false)
    const timerRef = React.useRef<NodeJS.Timeout>()

    const registerProps = rhfTransformRegister(
      register(name, {
        disabled,
        async validate(value) {
          if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
          }

          let errorMessage: string

          if (!RANGE_LENGTH_USERNAME_REGEX.test(value)) {
            errorMessage = messages.rangeLength
          } else if (!ALLOWED_CHARACTERS_USERNAME_REGEX.test(value)) {
            errorMessage = messages.allowedCharacters
          } else if (!LOW_LINES_USERNAME_REGEX.test(value)) {
            errorMessage = messages.lowLines
          } else {
            const isAvailable = await new Promise<boolean>((resolve) => {
              setIsPending(true)

              timerRef.current = setTimeout(() => {
                resolve(isUsernameAvailable(value))

                timerRef.current = null

                setIsPending(false)
              }, 500)
            })

            if (!isAvailable) {
              errorMessage = messages.unavailable
            }
          }

          if (isPending) {
            setIsPending(false)
          }

          return errorMessage
        },
      })
    )
    const { error, isDirty } = getFieldState(name, formState)
    const inputHelperText = error
      ? error.message
      : isDirty && !error
      ? helperTextSuccess
      : helperText

    return (
      <PendingIndicatorInput
        ref={ref}
        isPending={isPending}
        error={Boolean(error)}
        helperText={inputHelperText}
        label='Имя пользователя'
        autoComplete='off'
        inputProps={{
          'aria-label': 'Создайте имя пользователя',
          spellCheck: false,
          ...inputProps,
        }}
        {...rest}
        {...registerProps}
      />
    )
  }
)
