import React from 'react'
import NextLink from 'next/link'
import { Box } from '@mui/material'
import { LogoIcon } from 'src/components/icons'

export interface LoginFormProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function LoginForm({ title, children }: LoginFormProps) {
  return (
    <>
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
      <Box
        component='h1'
        sx={{ fontSize: 26, fontWeight: 'regular', textAlign: 'center', mt: 0, mb: 3 }}
      >
        {title}
      </Box>
      {children}
    </>
  )
}
