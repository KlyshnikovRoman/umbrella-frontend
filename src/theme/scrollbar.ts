interface ScrollbarOptions {
  track?: string
  thumb: string
  active: string
  size?: number
}

export function scrollbar({ track = 'transparent', thumb, active, size = 9 }: ScrollbarOptions) {
  return {
    scrollbarColor: `${thumb} ${track}`,
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      width: size,
      height: size,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: Math.floor(size / 2),
      backgroundColor: thumb,
      minHeight: 24,
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: active,
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: active,
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: active,
    },
    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
      backgroundColor: track,
    },
  }
}
