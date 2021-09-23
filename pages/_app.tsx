import { IdProvider } from '@radix-ui/react-id'
import { reset } from '@styles/reset'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { globalCss } from 'stitches.config'
import '../styles.css'

const App = ({ Component, pageProps }: AppProps) => {
  globalCss(reset, {
    'body, button': {
      fontFamily: '$untitled',
    },
  })

  return (
    <IdProvider>
      <Head>
        <title>Design System</title>
        <link
          rel="stylesheet"
          href="https://develop.modulz.app/fonts/fonts.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </IdProvider>
  )
}

export default App
