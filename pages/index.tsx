import Link from 'next/link'
import cx from 'classnames'
import { useState, useMemo } from 'react'
import { FilterButton } from '@/src/components/FilterButton'
import { Filters } from '@/src/types'
import tw from '@/src/tailwindClassNames'
import { InferGetStaticPropsType } from 'next'
import fetchPlayers from '@/src/fetchPlayers'
import Head from '@/components/Head'

const defaultFilters: Filters = {
  hardware: { Console: true, Emulator: false },
  playStyle: { Tap: false, DAS: false },
}

const cellPadding = 'py-3 px-2 sm:p-4'

const noFilterSet = (facetSetting) => Object.values(facetSetting).every((value) => value === false)

const Home = ({ players }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <Head />

      <main className={cx(tw.container, 'text-sm sm:text-base sm:mb-20')}>
        <h1 className={cx(tw.pagePadding, 'mt-8 text-xs sm:text-base')}>
          Classic Tetris Leaderboard
        </h1>
        <div className={cx(tw.pagePadding, 'flex mt-8 space-x-3')}>
          <FilterButton filters={filters} setFilters={setFilters} facet="playStyle" value="DAS">
            DAS
          </FilterButton>
          <FilterButton filters={filters} setFilters={setFilters} facet="playStyle" value="Tap">
            TAP
          </FilterButton>
          <FilterButton filters={filters} setFilters={setFilters} facet="hardware" value="Console">
            Console only
          </FilterButton>
        </div>

        <table className="min-w-full bg-white mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className={cx(cellPadding)}></th>
              <th className={cx(cellPadding)}></th>
              <th className={cx(cellPadding, 'text-left uppercase')}>Score</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredPlayers.map(({ name, score, playStyle, link }, index) => {
              const tapOrSomething = playStyle === 'Tap' ? 'TAP' : playStyle
              return (
                <tr key={name} className={cx('align-text-top', { 'bg-gray-100': index % 2 })}>
                  <td className={cellPadding}>{index + 1}</td>
                  <td className={cellPadding}>
                    <div className="grid gap-2 sm:grid-flow-col sm:grid-cols-auto-1fr">
                      <div className="hyphenate">{name}</div>
                      <div className="flex items-baseline sm:justify-between sm:flex-row-reverse">
                        <div
                          className={cx('text-xs text-white p-1', {
                            'bg-red-200': tapOrSomething === 'TAP',
                            'bg-blue-200': playStyle === 'DAS',
                            'bg-purple-200': !(tapOrSomething === 'TAP' || playStyle === 'DAS'),
                          })}
                        >
                          {tapOrSomething}
                        </div>
                        {link && (
                          <Link href={link}>
                            <a className={cx('text-xs ml-3', tw.link)}>see all{'>'}</a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={cellPadding}>{score.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>

      <footer
        className={cx(
          tw.container,
          tw.pagePadding,
          'sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:bg-white',
          'py-4'
        )}
      >
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>{' '}
        Thank you to the Classic Tetris community for maintaining this list{' '}
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>
      </footer>
    </>
  )
}

export const getStaticProps = async () => {
  const players = await fetchPlayers()
  return { props: { players }, revalidate: 89 }
}

export default Home
