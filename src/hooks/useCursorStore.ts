import { create } from 'zustand'

interface CursorState {
  isHovering: boolean
  cursorText: string
  cursorVariant: 'default' | 'hover' | 'click'
  setIsHovering: (isHovering: boolean) => void
  setCursorText: (text: string) => void
  setCursorVariant: (variant: 'default' | 'hover' | 'click') => void
}

export const useCursorStore = create<CursorState>((set) => ({
  isHovering: false,
  cursorText: '',
  cursorVariant: 'default',
  setIsHovering: (isHovering) => set({ isHovering }),
  setCursorText: (text) => set({ cursorText: text }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))
