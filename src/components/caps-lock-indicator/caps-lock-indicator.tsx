import React from 'react'

export interface CapsLockIndicatorProps {
  onCapsLockChange?(bool: boolean): void
  children: React.ReactNode | ((bool: boolean) => React.ReactNode)
}

export function CapsLockIndicator({ onCapsLockChange, children }: CapsLockIndicatorProps) {
  const [isCapsLock, setIsCapsLock] = React.useState<boolean>(false)

  const onKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const capsLockState = event.getModifierState?.('CapsLock')

      if (isCapsLock !== capsLockState) {
        setIsCapsLock(capsLockState)
        onCapsLockChange?.(capsLockState)
      }
    },
    [isCapsLock, onCapsLockChange]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyPress)
    document.addEventListener('keyup', onKeyPress)

    return () => {
      document.removeEventListener('keydown', onKeyPress)
      document.removeEventListener('keyup', onKeyPress)
    }
  }, [onKeyPress])

  if (typeof children === 'function') {
    return <>{children(isCapsLock)}</>
  }

  return <>{isCapsLock ? children : null}</>
}
