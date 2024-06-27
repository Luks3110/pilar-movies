'use client'

import useFilterStore from '@/hooks/stores/useFilterStore'
import { StarIcon, TrendingUpIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function MovieSearchbar() {
  const { search, searchType, setSearch, setSearchType, setPage } =
    useFilterStore()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleTrendingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(searchType === 'trending' ? 'normal' : 'trending')
    setPage(1)
  }

  const handlePopularClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(searchType === 'popular' ? 'normal' : 'popular')
    setPage(1)
  }

  return (
    <div className="flex-1 sticky top-0 w-full rounded-b-lg">
      <div className="w-full h-full">
        <Input
          type="text"
          placeholder="Procure por filmes..."
          onChange={handleSearch}
          className="text-2xl w-full h-[35%] rounded-full
           border-muted px-4 py-2 focus:ring-primary shadow-lg border-b-1"
          value={search}
        />
      </div>
      <div
        className={`w-[20%] h-[80%] absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-slate-700 shadow-2xl rounded-full outline-none`}
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
