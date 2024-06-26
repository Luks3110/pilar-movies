import useFilterStore from '@/hooks/stores/useFilterStore'
import { act, renderHook } from '../..'

describe('useFilterStore', () => {
  it('should update search when setSearch is called', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setSearch('test search')
    })

    expect(result.current.search).toBe('test search')
  })

  it('should update page when setPage is called', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)
  })

  it('should update searchType when setSearchType is called', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setSearchType('trending')
    })

    expect(result.current.searchType).toBe('trending')
  })

  it('should update timeWindow when setTimeWindow is called', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setTimeWindow('week')
    })

    expect(result.current.timeWindow).toBe('week')
  })
})
