import React from 'react'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import { Link, Typography } from '@mui/material'
import { LoginWrapper } from 'src/features/login/components/login-wrapper'
import { LoginForm } from 'src/features/login/components/login-form'
import { SignupForm } from 'src/features/login/components/signup-form'

export default function Signup() {
  return (
    <LoginWrapper>
      <NextSeo title='Регистрация' />
      <LoginForm title='Регистрация'>
        <SignupForm />
        <Typography sx={{ mt: 3 }} align='center'>
          Уже есть аккаунт?{' '}
          <NextLink href='/login/signin' passHref>
            <Link>Войдите</Link>
          </NextLink>
        </Typography>
      </LoginForm>
    </LoginWrapper>
  )
}
