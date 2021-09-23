import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../stitches.config'
import { css } from 'stitches.config'

const body = css({
  include: ['box', 'minHeightScreen'],
})

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body className={body()}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
