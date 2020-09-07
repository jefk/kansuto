import Head from 'next/head'
import { players } from '@/data/scores'
import cx from 'classnames'
import { useState, useMemo } from 'react'
import get from 'lodash/get'

interface Filters {
  hardware: {
    Console: boolean
    Emulator: boolean
  }
}

const defaultFilters: Filters = {
  hardware: { Console: true, Emulator: false },
}

const tw = {
  button: ['px-3', 'py-2', 'border-4', 'border-gray-800', 'transition', 'duration-100'],
}

const Home = () => {
  const [filters, setFilters] = useState(defaultFilters)
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) => {
        return get(filters, `hardware.${player.hardware}`)
      }),
    [filters]
  )
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="flex gap-3 mt-8">
          <button
            className={cx(tw.button, { 'bg-purple-400': filters.hardware.Console })}
            onClick={() =>
              setFilters((filters) => {
                const hardware = { ...filters.hardware, Console: !filters.hardware.Console }
                return { ...filters, hardware }
              })
            }
          >
            Console
          </button>
          <button>Emulator</button>
        </div>
        <div className="flex gap-3 mt-8">
          <div>DAS</div>
          <div>TAP</div>
        </div>
        <table className="min-w-full bg-white mt-8">
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
            {filteredPlayers.map(({ name, score, playStyle, hardware }, index) => (
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
}

export default Home
