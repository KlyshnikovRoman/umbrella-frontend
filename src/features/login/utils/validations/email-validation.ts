import { initializeApollo } from 'src/graphql/apollo'
import { IsEmailAvailableDocument, IsEmailAvailableQuery } from 'src/graphql/schema'

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export async function isEmailAvailable(email: string) {
  const client = initializeApollo()

  try {
    const {
      data: { isEmailAvailable },
    } = await client.query<IsEmailAvailableQuery>({
      query: IsEmailAvailableDocument,
      variables: { email },
      fetchPolicy: 'no-cache',
    })

    return isEmailAvailable
  } catch {
    return false
  }
}

export const messages = {
  invalid: 'Адрес электронной почты введён некорректно.',
  unavailable: 'Это адрес электронной почты уже используется.',
  notice: 'На этот адрес будет выслано письмо с инструкцией для завершении регистрации.',
}
