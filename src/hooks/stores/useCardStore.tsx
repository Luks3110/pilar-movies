import { create } from 'zustand'

interface CardStore {
  isMouseEntered: boolean
  setIsMouseEntered: (isMouseEnter: boolean) => void
}

const useCardStore = create<CardStore>((set) => ({
  isMouseEntered: false,
  setIsMouseEntered: (isMouseEntered) => set({ isMouseEntered }),
}))

export default useCardStore
