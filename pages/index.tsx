import Head from 'next/head'
import { players } from '@/data/scores'
import cx from 'classnames'
import { useState, useMemo } from 'react'

interface Filters {
  hardware: {
    Console: boolean
    Emulator: boolean
  }
  playStyle: {
    Hypertap: boolean
    DAS: boolean
  }
}

const defaultFilters: Filters = {
  hardware: { Console: true, Emulator: false },
  playStyle: { Hypertap: false, DAS: false },
}

const tw = {
  button: ['px-3', 'py-2', 'border-4', 'border-gray-800', 'transition', 'duration-100'],
}

const noFilterSet = (facetSetting) => Object.values(facetSetting).every((value) => value === false)

const Home = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) =>
        ['hardware', 'playStyle'].every((facet) => {
          if (noFilterSet(filters[facet])) {
            return true
          }
          return filters[facet][player[facet]]
        })
      ),
    [filters]
  )
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="flex gap-4 mt-8">
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
          <button
            className={cx(tw.button, { 'bg-purple-400': filters.hardware.Emulator })}
            onClick={() =>
              setFilters((filters) => {
                const hardware = { ...filters.hardware, Emulator: !filters.hardware.Emulator }
                return { ...filters, hardware }
              })
            }
          >
            Emulator
          </button>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            className={cx(tw.button, { 'bg-purple-400': filters.playStyle.DAS })}
            onClick={() =>
              setFilters((filters) => {
                const playStyle = { ...filters.playStyle, DAS: !filters.playStyle.DAS }
                return { ...filters, playStyle }
              })
            }
          >
            DAS
          </button>
          <button
            className={cx(tw.button, { 'bg-purple-400': filters.playStyle.Hypertap })}
            onClick={() =>
              setFilters((filters) => {
                const playStyle = { ...filters.playStyle, Hypertap: !filters.playStyle.Hypertap }
                return { ...filters, playStyle }
              })
            }
          >
            TAP
          </button>
        </div>
        <table className="min-w-full bg-white mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Rank</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Score</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredPlayers.map(({ name, score }, index) => (
              <tr key={name} className={cx({ 'bg-gray-100': index % 2 })}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{name}</td>
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
