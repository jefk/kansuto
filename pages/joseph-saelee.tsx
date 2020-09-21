import cx from 'classnames'
import joseph from '@/data/joseph'
import tw from '@/src/tailwindClassNames'
import { useState } from 'react'
import useWindowSize from '@/src/hooks/useWindowSize'
import Link from 'next/link'
import Head from '@/components/Head'

const getVideoId = (url: string) => url.replace(/.*v=/, '')

const data = joseph
  .map(({ date, video, ...rest }) => ({
    date: new Date(date),
    videoId: getVideoId(video),
    ...rest,
  }))
  .sort(({ score }) => -1 * score)

const Player = () => {
  const windowSize = useWindowSize()
  const [selectedVideo, setSelectedVideo] = useState(data[0].videoId)

  const videoWidth = windowSize.width && Math.min(windowSize.width, 768)

  return (
    <>
      <Head />
      <main className={cx(tw.container, 'text-sm sm:text-base grid gap-8 my-8 max-w-screen-md')}>
        <Link href="/">
          <a className={cx(tw.link, tw.pagePadding)}>{'< back'}</a>
        </Link>
        <h1 className={cx(tw.pagePadding, 'hyphenate text-2xl')}>Joseph Saelee high scores</h1>
        {videoWidth && (
          <iframe
            title="high score"
            width={videoWidth}
            height={videoWidth / 2}
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=0`}
            frameBorder="0"
          />
        )}
        <table className="min-w-full bg-white">
          {data.map(({ score, date, videoId }, index) => {
            const colors =
              selectedVideo === videoId
                ? 'bg-purple-400 shadow'
                : index % 2 === 0
                ? 'bg-gray-100'
                : ''
            return (
              <tr key={score} className={colors} onClick={() => setSelectedVideo(videoId)}>
                <td className={tw.cellPadding}>{date.toISOString().split('T')[0]}</td>
                <td className={cx(tw.cellPadding, 'text-right')}>{score.toLocaleString()}</td>
              </tr>
            )
          })}
        </table>
      </main>
    </>
  )
}

export default Player
