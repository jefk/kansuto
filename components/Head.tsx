import NextHead from 'next/head'

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

const Head = () => {
  return (
    <NextHead>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />

      <link rel="preload" href="/PressStart2P-vaV7.ttf" as="font" crossOrigin="anonymous" />

      {gaId && (
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
