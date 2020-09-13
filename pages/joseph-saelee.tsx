import cx from 'classnames'
import joseph from '@/data/joseph'
import tw from '@/src/tailwindClassNames'
import sortBy from 'lodash/sortBy'
import { useEffect, useState } from 'react'

const pagePadding = 'px-3 sm:p-0'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

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

  const videoWidth = Math.min(windowSize.width, 768)

  return (
    <main className={cx(tw.container, 'text-sm sm:text-base grid gap-8 my-8 max-w-screen-md')}>
      <h1 className={cx(pagePadding, 'hyphenate text-xl')}>Joseph Saelee high scores</h1>
      <iframe
        title="high score"
        width={videoWidth}
        height={videoWidth / 2}
        src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=0`}
        frameBorder="0"
      ></iframe>
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
  )
}

export default Player
