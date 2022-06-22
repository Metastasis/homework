import type { AppProps } from 'next/app'
import {isClient} from '@features/next'
import '../styles/globals.css'

if (isClient() && process.env.NODE_ENV === 'development') {
  const {worker} = require('../mock')
  worker.start()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
