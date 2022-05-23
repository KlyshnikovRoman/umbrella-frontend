import React from 'react'
import NextLink from 'next/link'
import { Link, Typography } from '@mui/material'
import { LoginWrapper } from 'src/features/login/components/login-wrapper'
import { SignupForm } from 'src/features/login/components/signup-form'

export default function Signup() {
  return (
    <LoginWrapper title='Регистрация'>
      <SignupForm />
      <Typography sx={{ mt: 3 }} align='center'>
        Уже есть аккаунт?{' '}
        <NextLink href='/login/signin' passHref>
          <Link>Войдите</Link>
        </NextLink>
      </Typography>
    </LoginWrapper>
  )
}
