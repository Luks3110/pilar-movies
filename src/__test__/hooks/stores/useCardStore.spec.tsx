import useCardStore from '@/hooks/stores/useCardStore'
import { act, renderHook } from '../..'

describe('useCardStore', () => {
  it('should initialize with isMouseEntered as false', () => {
    const { result } = renderHook(() => useCardStore())
    expect(result.current.isMouseEntered).toBe(false)
  })

  it('should update isMouseEntered when setIsMouseEntered is called', () => {
    const { result } = renderHook(() => useCardStore())

    act(() => {
      result.current.setIsMouseEntered(true)
    })

    expect(result.current.isMouseEntered).toBe(true)

    act(() => {
      result.current.setIsMouseEntered(false)
    })

    expect(result.current.isMouseEntered).toBe(false)
  })
})
