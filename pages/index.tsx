import Head from 'next/head'
import { players } from '@/data/scores'
import cx from 'classnames'
import { useState, useMemo, Children, Dispatch, SetStateAction } from 'react'

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
  button: ['px-3', 'py-2', 'border-4', 'border-gray-800', 'transition', 'duration-150'],
}

const noFilterSet = (facetSetting) => Object.values(facetSetting).every((value) => value === false)

const FilterButton: React.FunctionComponent<{
  setFilters: Dispatch<SetStateAction<Filters>>
  filters: Filters
  facet: string
  value: string
}> = ({ setFilters, filters, facet, value, children }) => (
  <button
    className={cx(tw.button, { 'bg-purple-400': filters[facet][value] })}
    onClick={() =>
      setFilters((filters) => {
        const newFacet = { ...filters[facet], [value]: !filters[facet][value] }
        return { ...filters, [facet]: newFacet }
      })
    }
  >
    {children}
  </button>
)

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
          <FilterButton filters={filters} setFilters={setFilters} facet="hardware" value="Console">
            Console
          </FilterButton>
          <FilterButton filters={filters} setFilters={setFilters} facet="hardware" value="Emulator">
            Emulator
          </FilterButton>
        </div>
        <div className="flex gap-4 mt-8">
          <FilterButton filters={filters} setFilters={setFilters} facet="playStyle" value="DAS">
            DAS
          </FilterButton>
          <FilterButton
            filters={filters}
            setFilters={setFilters}
            facet="playStyle"
            value="Hypertap"
          >
            TAP
          </FilterButton>
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
