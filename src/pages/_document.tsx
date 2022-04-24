import React from 'react'
import NextDocument, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from 'src/utils/create-emotion-cache'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage
    const emotionCache = createEmotionCache()

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhanceApp(props) {
            return <App emotionCache={emotionCache} {...props} />
          },
      })

    const initialProps = await super.getInitialProps(ctx)
    const { extractCriticalToChunks } = createEmotionServer(emotionCache)
    const { styles } = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = styles.map(({ key, ids, css }) => (
      <style
        key={key}
        data-emotion={`${key} ${ids.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ))

    return {
      ...initialProps,
      styles: [...emotionStyleTags, ...React.Children.toArray(initialProps.styles)],
    }
  }

  render() {
    return (
      <Html lang='ru'>
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Light.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Light.woff') format('woff');font-weight:300;font-style:normal}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Regular.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Regular.woff') format('woff');font-weight:400;font-style:normal}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-ThinOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-ThinOblique.woff') format('woff');font-weight:100;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Thin.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Thin.woff') format('woff');font-weight:100;font-style:normal}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-BoldBoldOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-BoldOblique.woff') format('woff');font-weight:700;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-MediumOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-MediumOblique.woff') format('woff');font-weight:500;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Bold.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Bold.woff') format('woff');font-weight:700;font-style:normal}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Medium.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Medium.woff') format('woff');font-weight:500;font-style:normal}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-RegularOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-RegularOblique.woff') format('woff');font-weight:400;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-LightOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-LightOblique.woff') format('woff');font-weight:300;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-BlackOblique.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-BlackOblique.woff') format('woff');font-weight:900;font-style:italic}@font-face{font-display:swap;font-family:'GT Walsheim Pro';src:url('/fonts/GTWalsheimPro/GTWalsheimPro-Black.woff2') format('woff2'),url('/fonts/GTWalsheimPro/GTWalsheimPro-Black.woff') format('woff');font-weight:900;font-style:normal}`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
