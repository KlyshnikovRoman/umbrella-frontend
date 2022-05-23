import React from 'react'
import { Stack, Alert, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { UsernameValidationInput } from 'src/features/login/components/username-validation-input'
import { EmailValidationInput } from 'src/features/login/components/email-validation-input'
import { PasswordValidationInputs } from 'src/features/login/components/password-validation-inputs'
import { useSignupFormRegisterMutation } from 'src/graphql/schema'

interface FormValues {
  email: string
  username: string
  password: string
  repassword: string
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
  const [createUser, { error, reset }] = useSignupFormRegisterMutation()
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset: resetForm,
    setFocus,
  } = methods

  React.useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, username, password } = data

    try {
      await createUser({
        variables: {
          input: { email, username, password },
        },
      })

      resetForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider {...methods}>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={3}>
        {error && (
          <Alert
            severity='error'
            action={
              <IconButton onClick={reset} aria-label='Закрыть' color='inherit' size='small'>
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            Что-то пошло не так. Повторите попытку позже.
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
        >
          Зарегистрироваться
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
