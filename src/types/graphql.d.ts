declare module '*.graphql' {
  import { DocumentNode } from '@apollo/client'

  const document: DocumentNode

  export default document
}
