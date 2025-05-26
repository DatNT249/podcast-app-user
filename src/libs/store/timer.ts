import { create } from 'zustand'

export type SetTimerType = {
	isTimerActive: boolean
	timerDuration: number
	isPlayingEndBook?: boolean
}

interface BookTimerState {
	isTimerActive: boolean
	timerDuration: number
	isPlayingEndBook: boolean
	timeLeft: number
	setTimer: (timer: SetTimerType) => void
	clearTimer: () => void
	setTimeLeft: (timeLeft: number) => void
	setPlayingEndBook: (isPlayingEndBook: boolean) => void
}

export const useBookTimer = create<BookTimerState>((set) => ({
	isTimerActive: false,
	timerDuration: 0,
	isPlayingEndBook: false,
	timeLeft: 0,
	setTimer: ({ isTimerActive, timerDuration, isPlayingEndBook = false }: SetTimerType) => {
		set({ isTimerActive, timerDuration, isPlayingEndBook })
	},
	clearTimer: () => set({ isTimerActive: false, timerDuration: 0, isPlayingEndBook: false }),
	setTimeLeft: (timeLeft: number) => set({ timeLeft }),
	setPlayingEndBook: (isPlayingEndBook: boolean) => set({ isPlayingEndBook }),
}))
