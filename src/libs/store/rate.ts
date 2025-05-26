import { create } from 'zustand'

interface RatePlayerState {
	rate: number
	setRate: (rate: number) => void
}

export const useRatePayer = create<RatePlayerState>((set) => ({
	rate: 1,
	setRate: (rate: number) => set({ rate }),
}))
