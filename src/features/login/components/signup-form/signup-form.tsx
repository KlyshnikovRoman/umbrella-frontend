import React from 'react'
import { Stack, Alert, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { UsernameValidationInput } from 'src/features/login/components/username-validation-input'
import { EmailValidationInput } from 'src/features/login/components/email-validation-input'
import { PasswordValidationInputs } from 'src/features/login/components/password-validation-inputs'
import { useSignupFormRegisterMutation, useSignupFormRecaptchaLazyQuery } from 'src/graphql/schema'
import { useRecaptcha } from 'src/hooks/use-recaptcha'

interface FormValues {
  email: string
  username: string
  password: string
  repassword: string
  service: any
}

export function SignupForm() {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repassword: '',
    },
  })
  const [createUser] = useSignupFormRegisterMutation()
  const [getRecaptchaResponse] = useSignupFormRecaptchaLazyQuery()
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setFocus,
    setError,
    clearErrors,
  } = methods
  const { execute } = useRecaptcha()

  React.useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormValues> = async ({ email, username, password }) => {
    try {
      const token = await execute({ action: 'submit' })
      const {
        data: { recaptcha },
      } = await getRecaptchaResponse({ variables: { token } })

      if (!recaptcha.success && recaptcha.score < 0.5) {
        setError('service', {
          type: 'recaptcha',
          message: 'Вы не прошли проверку Google reCAPTCHA v3.',
        })

        return
      }

      await createUser({
        variables: {
          input: { email, username, password },
        },
      })

      reset()
    } catch (error) {
      setError('service', {
        type: 'unknown',
        message: 'Что-то пошло не так. Повторите попытку позже.',
      })

      console.error(error)
    }
  }

  const onClickAlertCloseButton = () => {
    clearErrors('service')
  }

  return (
    <FormProvider {...methods}>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3}>
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
        <EmailValidationInput id='signup-email' name='email' fullWidth />
        <UsernameValidationInput id='signup-username' name='username' fullWidth />
        <PasswordValidationInputs
          passwordProps={{
            id: 'signup-password',
            name: 'password',
            fullWidth: true,
          }}
          repasswordProps={{
            id: 'signup-repassword',
            name: 'repassword',
            fullWidth: true,
          }}
        />
        <LoadingButton
          sx={{ mt: 3 }}
          type='submit'
          variant='contained'
          loading={isSubmitting}
          fullWidth
          data-action='submit'
        >
          Зарегистрироваться
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
