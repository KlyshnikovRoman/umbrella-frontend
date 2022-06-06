import React from 'react'
import { LoginWrapper } from 'src/features/login/components/login-wrapper'
import { LoginForm } from 'src/features/login/components/login-form'
import { VerifyForm } from 'src/features/login/components/verify-form'

export default function Verify() {
  return (
    <LoginWrapper>
      <LoginForm title='Подтверждение аккаунта'>
        <VerifyForm />
      </LoginForm>
    </LoginWrapper>
  )
}
