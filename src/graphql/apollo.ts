import React from 'react'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import { graphqlEndpoint, graphqlAuthToken } from 'src/config'
import typeDefs from './type-defs.graphql'

const isServer = typeof window === 'undefined'
let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: graphqlEndpoint,
      headers: {
        Authorization: graphqlAuthToken,
      },
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    typeDefs,
  })
}

export function initializeApollo(initialState?: NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    _apolloClient.cache.restore(data)
  }

  if (isServer) {
    return _apolloClient
  }

  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export function useApollo(initialState: NormalizedCacheObject) {
  return React.useMemo(() => initializeApollo(initialState), [initialState])
}
