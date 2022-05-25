import getConfig from 'next/config'

export const {
  publicRuntimeConfig: { graphqlEndpoint, recaptchaKey },
} = getConfig()
