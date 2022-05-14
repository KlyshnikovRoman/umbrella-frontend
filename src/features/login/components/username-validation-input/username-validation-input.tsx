import React from 'react'
import { TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  ALLOWED_CHARACTERS_USERNAME_REGEX,
  isUsernameAvailable,
  LOW_LINES_USERNAME_REGEX,
  RANGE_LENGTH_USERNAME_REGEX,
  messages,
} from 'src/features/login/utils/validations/username-validation'

export type UsernameValidationInputProps = {
  helperTextSuccess?: React.ReactNode
} & TextFieldProps

export const UsernameValidationInput = React.forwardRef<any, UsernameValidationInputProps>(
  function UsernameValidationInput(props, ref) {
    const {
      name,
      inputProps,
      helperTextSuccess = messages.success,
      helperText: helperTextProp = messages.allowedCharacters,
      ...rest
    } = props
    const [isPending, setIsPending] = React.useState<boolean>(false)
    const timerRef = React.useRef<NodeJS.Timeout>()

    return (
      <Controller
        name={name}
        rules={{
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
              setIsPending(true)

              const isAvailable = await new Promise<boolean>((resolve) => {
                timerRef.current = setTimeout(() => {
                  resolve(isUsernameAvailable(value))

                  timerRef.current = null
                }, 500)
              })

              if (!isAvailable) {
                errorMessage = messages.unavailable
              }

              setIsPending(false)
            }

            if (isPending) {
              setIsPending(false)
            }

            return errorMessage
          },
        }}
        render={({ field: { ref: inputRef, ...restField }, fieldState: { error, isDirty } }) => {
          const helperText = error
            ? error.message
            : isDirty && !error
            ? helperTextSuccess
            : helperTextProp

          return (
            <PendingIndicatorInput
              isPending={isPending}
              ref={ref}
              inputRef={inputRef}
              error={Boolean(error)}
              helperText={helperText}
              label='Имя пользователя'
              autoComplete='off'
              inputProps={{
                'aria-label': 'Создайте имя пользователя',
                spellCheck: false,
                ...inputProps,
              }}
              {...rest}
              {...restField}
            />
          )
        }}
      />
    )
  }
)
