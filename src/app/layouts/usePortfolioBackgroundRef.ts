import type { RefObject } from 'react'
import { useOutletContext } from 'react-router-dom'

export function usePortfolioBackgroundRef() {
  return useOutletContext<RefObject<HTMLDivElement | null>>()
}
