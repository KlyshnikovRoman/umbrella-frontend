import React from 'react'
import { Box } from '@mui/material'
import NextLink from 'next/link'
import { LogoIcon } from 'src/components/icons'

export interface LoginWrapperProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function LoginWrapper({ title, children }: LoginWrapperProps) {
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
          <Box
            component='h1'
            sx={{ fontSize: 26, fontWeight: 'regular', textAlign: 'center', mt: 0, mb: 3 }}
          >
            {title}
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
