import getConfig from 'next/config'

export const {
  publicRuntimeConfig: { graphqlEndpoint, graphqlAuthToken },
} = getConfig()
