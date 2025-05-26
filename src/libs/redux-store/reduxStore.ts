import { configureStore } from '@reduxjs/toolkit'
import reducers from './rootReducers'

export const reduxStore = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
