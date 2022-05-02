import { initializeApollo } from 'src/graphql/apollo'
import { IsUsernameAvailableDocument, IsUsernameAvailableQuery } from 'src/graphql/schema'

export const RANGE_LENGTH_USERNAME_REGEX = /^.{3,20}$/
export const ALLOWED_CHARACTERS_USERNAME_REGEX = /^\w+$/
export const LOW_LINES_USERNAME_REGEX = /^(?!_)(?!.*_{2}).+(?<!_)$/

export async function isUsernameAvailable(username: string) {
  const client = initializeApollo()

  try {
    const {
      data: { isUsernameAvailable },
    } = await client.query<IsUsernameAvailableQuery>({
      query: IsUsernameAvailableDocument,
      variables: { username },
      fetchPolicy: 'no-cache',
    })

    return isUsernameAvailable
  } catch {
    return false
  }
}
