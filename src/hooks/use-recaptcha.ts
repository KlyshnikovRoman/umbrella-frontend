import { useSafeLayoutEffect } from 'src/hooks/use-safe-layout-effect'
import { recaptchaKey } from 'src/config'

const RECAPTCHA_SCRIPT_ID = 'recaptcha-script'

export interface UseRecaptchaExecuteOptions {
  action: string
}

declare const window: Window & {
  grecaptcha:
    | undefined
    | {
        execute: (key: string, options: UseRecaptchaExecuteOptions) => string
        ready: (callback: () => void) => void
      }
}

export function useRecaptcha() {
  useSafeLayoutEffect(() => {
    if (!document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.id = RECAPTCHA_SCRIPT_ID
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`

      document.head.appendChild(script)
    }
  }, [])

  const execute = async (options: UseRecaptchaExecuteOptions) => {
    return await new Promise<string>((resolve) => {
      window.grecaptcha.ready(() => {
        resolve(window.grecaptcha.execute(recaptchaKey, options))
      })
    })
  }

  return { execute }
}
