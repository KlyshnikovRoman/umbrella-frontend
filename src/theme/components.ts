import { alpha, lighten, Theme } from '@mui/material/styles'
import { scrollbar } from './scrollbar'

export function components(theme: Theme): Theme['components'] {
  const tooltipBgcolor = alpha(theme.palette.grey[500], 0.92)

  return {
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          ...scrollbar({
            thumb: theme.palette.grey[500],
            active: theme.palette.grey[400],
          }),
        },
        '#__next': {
          height: '100%',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tooltipBgcolor,
        },
        arrow: {
          color: tooltipBgcolor,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBackgroundClip: 'text',
            WebkitBoxShadow: 'none !important',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: lighten(theme.palette.grey[500], 0.1),
        },
      },
    },
  }
}
