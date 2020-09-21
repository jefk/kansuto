import NextHead from 'next/head'
import { FunctionComponent, useMemo } from 'react'

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

interface Props {
  title?: string
}

const Head: FunctionComponent<Props> = ({ title }) => {
  const enableAnalytics = gaId && typeof navigator !== 'undefined' && !navigator.doNotTrack
  const titleText = title || 'NES Tetris High Scores'

  return (
    <NextHead>
      <title>{titleText}</title>
      <meta name="description" content="Top scores from the NES version of Classic Tetris"></meta>
      <link rel="icon" href="/favicon.ico" />

      <link rel="preload" href="/PressStart2P-vaV7.ttf" as="font" crossOrigin="anonymous" />

      {enableAnalytics && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${gaId}');`,
            }}
          />
        </>
      )}
    </NextHead>
  )
}

export default Head
