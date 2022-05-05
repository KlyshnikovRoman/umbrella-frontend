import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  EMAIL_REGEX,
  isEmailAvailable,
  errorMessages,
} from 'src/features/login/utils/validations/email-validation'

export type EmailValidationInputProps = TextFieldProps

export const EmailValidationInput = React.forwardRef<any, EmailValidationInputProps>(
  function EmailValidationInput(props, ref) {
    const { name: nameProp, helperText, ...rest } = props
    const { register, getValues, formState, getFieldState } = useFormContext()
    const [isPending, setIsPending] = React.useState<boolean>(false)
    const timerRef = React.useRef<NodeJS.Timeout>()
    const prevValue = React.useRef(getValues(nameProp))
    const {
      ref: inputRef,
      name,
      onChange,
      onBlur,
    } = register(nameProp, {
      async validate(value) {
        // При изменении поля сбрасывать таймер, если он до этого был установлен, но так и не успел
        // сработать, потому что было изменено значение раньше, чел сработал таймер и был выполнен
        // запрос.
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }

        let error: string

        if (!EMAIL_REGEX.test(value)) {
          error = errorMessages.invalid
        }
        // Это условие для того, чтобы при повторных проверок onBlur и onSubmit не делать лишних
        // отправок запросов.
        else if (prevValue.current !== value) {
          const isAvailable = await new Promise<boolean>((resolve) => {
            setIsPending(true)

            timerRef.current = setTimeout(() => {
              resolve(isEmailAvailable(value))

              timerRef.current = null

              setIsPending(false)
            }, 500)
          })

          if (!isAvailable) {
            error = errorMessages.unavailable
          }

          // Предыдущее значение нас интересует только для этого блока, поэтому установка его должна
          // быть здесь с момента последнего запроса.
          prevValue.current = value
        }

        // Если же isPending true, то устанавливаем false.
        // Это нужно, если предыдущее значение проверялось с отправкой запроса, но таймаут был
        // сброшен сверху, и не дошёл до проверки с запросом, вследствие чего isPending по-прежнему
        // активен.
        if (isPending) {
          setIsPending(false)
        }

        return error
      },
    })
    const { error } = getFieldState(name, formState)
    const inputHelperText = error ? error.message : helperText

    return (
      <PendingIndicatorInput
        aria-label='Ввод адреса электронной почты'
        ref={ref}
        isPending={isPending}
        inputRef={inputRef}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={inputHelperText}
        label='Адрес электронной почты'
        spellCheck={false}
        {...rest}
      />
    )
  }
)
