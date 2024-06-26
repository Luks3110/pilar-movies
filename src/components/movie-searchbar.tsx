'use client'

import useFilterStore from '@/hooks/stores/useFilterStore'
import { StarIcon, TrendingUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function MovieSearchbar() {
  const { searchType, page, setSearch, setSearchType } = useFilterStore()
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedValue)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [debouncedValue])

  useEffect(() => {
    setDebouncedValue(inputValue)
  }, [page])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setDebouncedValue(e.target.value)
  }

  const handleTrendingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(searchType === 'trending' ? 'normal' : 'trending')
  }

  const handlePopularClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(searchType === 'popular' ? 'normal' : 'popular')
  }

  return (
    <div className="flex-1 relative w-full ">
      <div className="w-full h-full">
        <Input
          type="text"
          placeholder="Procure por filmes..."
          onChange={handleSearch}
          className="w-full rounded-full
           border-muted px-4 py-2 focus:ring-primary"
          value={inputValue}
        />
      </div>
      <div
        className={`w-[20%] h-[80%] absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-slate-700 shadow-zinc-900  rounded-full outline-none`}
      >
        <Button
          size="icon"
          className={`w-full h-full rounded-l-full border-transparent rounded-r-none transition-transform duration-300 ease-in-out hover:scale-105 ${searchType === 'trending' ? 'bg-zinc-100 text-zinc-950 hover:text-white' : ''}`}
          onClick={handleTrendingClick}
        >
          <div className="flex items-center gap-1">
            <TrendingUpIcon className="w-4 h-4" />
            <span className="hidden sm:block">Trending</span>
          </div>
        </Button>
        <Button
          size="icon"
          className={`w-full h-full rounded-r-full rounded-l-none transition-transform duration-300 ease-in-out hover:scale-105 ${searchType === 'popular' ? 'bg-zinc-100 text-zinc-950 hover:text-white' : ''}`}
          onClick={handlePopularClick}
        >
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4" />
            <span className="hidden sm:block">Popular</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
