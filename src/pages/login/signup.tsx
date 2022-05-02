/* eslint-disable no-console */
import React from 'react'
import NextLink from 'next/link'
import { Box, Link, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LogoIcon } from 'src/components/icons'
import { UsernameValidationInput } from 'src/features/login/components/username-validation-input'

export interface FormValues {
  username: string
}

function SignupForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      username: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <UsernameValidationInput control={control} name='username' />
      </Stack>
      <LoadingButton sx={{ mt: 3 }} type='submit' variant='contained' fullWidth>
        Зарегистрироваться
      </LoadingButton>
    </form>
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
              px: 4,
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
