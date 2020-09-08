import joseph from '@/data/joseph'

const Player = () => (
  <main className="container mx-auto">
    {joseph.map(({ score, date, video }) => {
      const theDate = new Date(date)
      return (
        <div key={score}>
          {score.toLocaleString()} - {theDate.toISOString().split('T')[0]} -{' '}
          <a href={video}>Video</a>
        </div>
      )
    })}
  </main>
)

export default Player
