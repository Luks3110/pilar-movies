import { SearchType, TimeWindow } from '@/lib/types/filter'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'

const urlQueryStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.search)
    const storedValue = searchParams.get(key) ?? ''
    return JSON.parse(storedValue)
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, JSON.stringify(newValue))
    window.history.replaceState(null, '', `?${searchParams.toString()}`)
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(key)
    window.location.search = searchParams.toString()
  },
}

interface FilterStore {
  search?: string
  searchType?: SearchType
  timeWindow?: TimeWindow
  page?: number
  totalPages?: number
  setSearch: (search: string) => void
  setSearchType: (searchType: SearchType) => void
  setTimeWindow: (timeWindow: TimeWindow) => void
  setPage: (page: number) => void
  setTotalPages: (totalPages: number) => void
  addPage: () => void
  removePage: () => void
}

const useFilterStore = create(
  persist<FilterStore>(
    (set) => ({
      setSearch: (search) => set({ search }),
      setPage: (page) => set({ page }),
      setSearchType: (searchType) => set({ searchType }),
      setTimeWindow: (timeWindow) => set({ timeWindow }),
      setTotalPages: (totalPages) => set({ totalPages }),
      addPage: () =>
        set((state) => ({ page: state?.page ? state.page + 1 : 1 })),
      removePage: () =>
        set((state) => ({ page: state?.page ? state.page - 1 : 1 })),
    }),
    {
      name: 'movie-filter-store',
      storage: createJSONStorage(() => urlQueryStorage),
    },
  ),
)

export default useFilterStore
