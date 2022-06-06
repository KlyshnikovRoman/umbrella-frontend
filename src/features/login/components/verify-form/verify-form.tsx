import React from 'react'
import { Alert, Box, IconButton, Link, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { PinInput } from 'src/components/pin-input'
import { EMAIL_REGEX, messages } from 'src/features/login/utils/validations/email-validation'
import { useVerifyMutation } from 'src/graphql/schema'
import { Close as CloseIcon } from '@mui/icons-material'

interface FormValues {
  email: string
  code: string[]
  service: any
}

export function VerifyForm() {
  const [email, setEmail] = React.useState('')
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: Array(6).fill(''),
    },
  })
  const [verifyMutation] = useVerifyMutation()

  React.useEffect(() => {
    const email = window.sessionStorage.getItem('signupEmail')

    if (email) {
      setEmail(email)
    }
  }, [])

  const onCompletePinInput = async () => {
    await onSubmit()
  }

  const onSubmit = handleSubmit(async (data: FormValues) => {
    const emailAddress = data.email || email

    if (emailAddress) {
      try {
        const {
          data: { accountVerify },
        } = await verifyMutation({
          variables: {
            email: emailAddress,
            code: data.code.join(''),
          },
        })

        if (!accountVerify.success && accountVerify.errorMessage) {
          setError('service', { type: 'dynamic', message: accountVerify.errorMessage })
        }
      } catch (error) {
        setError('service', {
          type: 'unknown',
          message: 'Что-то пошло не так. Повторите попытку позже.',
        })
      }
    }
  })

  const onClickAlertCloseButton = React.useCallback(() => {
    clearErrors('service')
  }, [clearErrors])

  return (
    <Stack component='form' onSubmit={onSubmit} spacing={3}>
      {email ? (
        <Typography textAlign='center' color='textSecondary'>
          Для подтверждения аккаунта введите 6-значный код, который был отправлен на адрес
          электронной почты{' '}
          <Typography component='span' fontWeight='bold'>
            {email}
          </Typography>
          .
        </Typography>
      ) : (
        <Typography textAlign='center' color='textSecondary'>
          Для подтверждении аккаунта введите адрес электронной почты и 6-значный код, который был
          выслан в письме.
        </Typography>
      )}
      {errors?.service && (
        <Alert
          severity='error'
          action={
            <IconButton
              onClick={onClickAlertCloseButton}
              aria-label='Закрыть'
              color='inherit'
              size='small'
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {errors.service?.message}
        </Alert>
      )}
      {!email && (
        <Controller
          control={control}
          name='email'
          rules={{
            validate(value) {
              return EMAIL_REGEX.test(value) || messages.invalid
            },
          }}
          render={({ field: { ref, ...rest }, fieldState: { error } }) => (
            <TextField
              inputRef={ref}
              label='Адрес электронной почты'
              id='verify-email'
              error={Boolean(error)}
              helperText={error?.message}
              fullWidth
              autoFocus
              {...rest}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name='code'
        rules={{
          validate(value) {
            return !value.includes('') || 'Все поля обязательны.'
          },
        }}
        render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
          <PinInput
            values={value}
            onChange={onChange}
            actionRef={ref}
            error={Boolean(error)}
            autoFocus={Boolean(email)}
            id='verify-pincode'
            onComplete={onCompletePinInput}
            helperText={error?.message}
            label={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Код подтверждения
                <Link
                  sx={{
                    ml: 1,
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                  component='button'
                  type='button'
                  variant='body2'
                >
                  Отправить код ещё раз
                </Link>
              </Box>
            }
            fullWidth
          />
        )}
      />
      <Typography textAlign='center' color='textSecondary'>
        Вы так же можете перейти по ссылке в письме.
      </Typography>
      <LoadingButton type='submit' variant='contained' loading={isSubmitting} fullWidth>
        Отправить
      </LoadingButton>
    </Stack>
  )
}
