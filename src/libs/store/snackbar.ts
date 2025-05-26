import { create } from 'zustand'

interface SnackbarState {
	visible: boolean
	message: string
	showSnackbar: (message: string) => void
	hideSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
	visible: false,
	message: '',
	showSnackbar: (message) => set({ visible: true, message }),
	hideSnackbar: () => set({ visible: false, message: '' }),
}))
