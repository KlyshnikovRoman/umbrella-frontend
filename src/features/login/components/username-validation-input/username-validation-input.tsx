import React from 'react'
import { TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PendingIndicatorInput } from 'src/components/pending-indicator-input'
import {
  ALLOWED_CHARACTERS_USERNAME_REGEX,
  isUsernameAvailable,
  LOW_LINES_USERNAME_REGEX,
  RANGE_LENGTH_USERNAME_REGEX,
  errorMessages,
} from 'src/features/login/utils/validations/username-validation'

export type UsernameValidationInputProps = {
  helperTextSuccess?: React.ReactNode
} & TextFieldProps

export const UsernameValidationInput = React.forwardRef<any, UsernameValidationInputProps>(
  function UsernameInputValidation(props, ref) {
    const {
      name: nameProp,
      helperText = errorMessages.allowedCharacters,
      helperTextSuccess,
      ...rest
    } = props
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

        if (!RANGE_LENGTH_USERNAME_REGEX.test(value)) {
          error = errorMessages.rangeLength
        } else if (!ALLOWED_CHARACTERS_USERNAME_REGEX.test(value)) {
          error = errorMessages.allowedCharacters
        } else if (!LOW_LINES_USERNAME_REGEX.test(value)) {
          error = errorMessages.lowLines
        }
        // Это условие для того, чтобы при повторных проверок onBlur и onSubmit не делать лишних
        // отправок запросов.
        else if (prevValue.current !== value) {
          const isAvailable = await new Promise<boolean>((resolve) => {
            setIsPending(true)

            timerRef.current = setTimeout(() => {
              resolve(isUsernameAvailable(value))

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
    const { error, isDirty } = getFieldState(name, formState)
    const inputHelperText = error
      ? error.message
      : isDirty && !error
      ? helperTextSuccess
      : helperText

    return (
      <PendingIndicatorInput
        aria-label='Создание имени пользователя'
        ref={ref}
        isPending={isPending}
        inputRef={inputRef}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={inputHelperText}
        label='Имя пользователя'
        autoComplete='off'
        spellCheck={false}
        {...rest}
      />
    )
  }
)
