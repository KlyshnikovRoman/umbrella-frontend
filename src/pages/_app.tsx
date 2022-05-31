import React from 'react'
import NextHead from 'next/head'
import type { AppProps as NexAppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'src/theme'
import { useApollo } from 'src/graphql/apollo'
import { createEmotionCache } from 'src/utils/create-emotion-cache'

const clientSideEmotionCache = createEmotionCache()

interface AppProps extends NexAppProps {
  emotionCache: EmotionCache
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <NextHead>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </NextHead>
      <DefaultSeo defaultTitle='Umbrella' titleTemplate='%s · Umbrella' />
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}
