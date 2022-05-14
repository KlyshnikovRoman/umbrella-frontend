import React from 'react'
import { TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  EMAIL_REGEX,
  isEmailAvailable,
  messages,
} from 'src/features/login/utils/validations/email-validation'

export type EmailValidationInputProps = TextFieldProps

export const EmailValidationInput = React.forwardRef<any, EmailValidationInputProps>(
  function EmailValidationInput(props, ref) {
    const { name, helperText = messages.notice, inputProps, ...rest } = props
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

            let error: string

            if (!EMAIL_REGEX.test(value)) {
              error = messages.invalid
            } else {
              setIsPending(true)

              const isAvailable = await new Promise<boolean>((resolve) => {
                timerRef.current = setTimeout(() => {
                  resolve(isEmailAvailable(value))

                  timerRef.current = null
                }, 500)
              })

              if (!isAvailable) {
                error = messages.unavailable
              }

              setIsPending(false)
            }

            if (isPending) {
              setIsPending(false)
            }

            return error
          },
        }}
        render={({ field: { ref: inputRef, ...restField }, fieldState: { error } }) => (
          <PendingIndicatorInput
            ref={ref}
            inputRef={inputRef}
            isPending={isPending}
            error={Boolean(error)}
            helperText={error?.message || helperText}
            label='Адрес электронной почты'
            inputProps={{
              'aria-label': 'Введите адрес электронной почты',
              spellCheck: false,
              ...inputProps,
            }}
            {...rest}
            {...restField}
          />
        )}
      />
    )
  }
)
