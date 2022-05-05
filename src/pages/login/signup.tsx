import React from 'react'
import NextLink from 'next/link'
import { Box, Link, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { LogoIcon } from 'src/components/icons'
import { EmailValidationInput } from 'src/features/login/components/email-validation-input'

interface FormValues {
  username: string
}

function SignupForm() {
  const methods = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <EmailValidationInput
            id='signup-email'
            name='email'
            helperText='На этот адрес будет выслано письмо с ссылкой для завершении регистрации.'
            autoFocus
            fullWidth
          />
        </Stack>
        <LoadingButton
          sx={{ mt: 3 }}
          type='submit'
          variant='contained'
          loading={isSubmitting}
          fullWidth
        >
          Зарегистрироваться
        </LoadingButton>
      </form>
    </FormProvider>
  )
}

export default function Signup() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'center' },
        }}
      >
        <Box
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            px: 2,
            py: 4,
            '@media (min-width: 450px)': {
              px: 3,
            },
            width: { sm: 440 },
            bgcolor: 'background.paper',
            borderRadius: { sm: 2 },
          }}
        >
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Box sx={{ mb: 1 }}>
              <NextLink href='/' passHref>
                <Box component='a' sx={{ display: 'inline-block' }}>
                  <LogoIcon width={38} height={38} />
                </Box>
              </NextLink>
            </Box>
            <Box sx={{ fontSize: 22 }}>Umbrella</Box>
          </Box>
          <Box sx={{ fontSize: 26, textAlign: 'center', mb: 3 }}>Регистрация</Box>
          <SignupForm />
          <Box sx={{ mt: 3 }}>
            <Typography align='center'>
              Уже есть аккаунт?{' '}
              <NextLink href='/login/signin' passHref>
                <Link>Войдите</Link>
              </NextLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
