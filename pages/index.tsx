import Head from 'next/head'
import { players } from '@/data/scores'
import cx from 'classnames'

const Home = () => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container mx-auto">
      <div className="py-8 w-full">
        <div className="overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Rank</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Play Style</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Hardware</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {players.map(({ name, score, playStyle, hardware, proof }, index) => (
                <tr key={name} className={cx({ 'bg-gray-100': index % 2 })}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{name}</td>
                  <td className="py-3 px-4">{playStyle}</td>
                  <td className="py-3 px-4">{hardware}</td>
                  <td className="py-3 px-4">{score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <footer className="container mx-auto my-8">
      <span role="img" aria-label="heart">
        ❤️
      </span>{' '}
      Thank you to the Classic Tetris community for maintaining this list{' '}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </footer>
  </>
)

export default Home
