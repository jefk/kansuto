import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { Filters } from '@/src/types'
import tw from '@/src/tailwindClassNames'

export const FilterButton: React.FunctionComponent<{
  setFilters: Dispatch<SetStateAction<Filters>>
  filters: Filters
  facet: string
  value: string
}> = ({ setFilters, filters, facet, value, children }) => {
  const isSelected = filters[facet][value]
  return (
    <button
      className={cx(tw.button, { 'bg-purple-400': isSelected })}
      onClick={() =>
        setFilters((filters) => {
          const newFacet = { ...filters[facet], [value]: !isSelected }
          return { ...filters, [facet]: newFacet }
        })
      }
    >
      {children}
    </button>
  )
}
