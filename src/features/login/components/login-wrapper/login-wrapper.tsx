import React from 'react'
import { Box } from '@mui/material'

export interface LoginWrapperProps {
  children: React.ReactNode
}

export function LoginWrapper({ children }: LoginWrapperProps) {
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
          {children}
        </Box>
      </Box>
    </Box>
  )
}
