import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  EMAIL_REGEX,
  isEmailAvailable,
  messages,
} from 'src/features/login/utils/validations/email-validation'
import { rhfTransformRegister } from 'src/utils/rhf-transform-register'

export type EmailValidationInputProps = TextFieldProps

export const EmailValidationInput = React.forwardRef<any, EmailValidationInputProps>(
  function EmailValidationInput(props, ref) {
    const { name, helperText, inputProps, disabled = false, ...rest } = props
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

          let error: string

          if (!EMAIL_REGEX.test(value)) {
            error = messages.invalid
          } else {
            const isAvailable = await new Promise<boolean>((resolve) => {
              setIsPending(true)

              timerRef.current = setTimeout(() => {
                resolve(isEmailAvailable(value))

                timerRef.current = null

                setIsPending(false)
              }, 500)
            })

            if (!isAvailable) {
              error = messages.unavailable
            }
          }

          if (isPending) {
            setIsPending(false)
          }

          return error
        },
      })
    )
    const { error } = getFieldState(name, formState)

    return (
      <PendingIndicatorInput
        ref={ref}
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
        {...registerProps}
      />
    )
  }
)
