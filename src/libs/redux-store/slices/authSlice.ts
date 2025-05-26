import { checkSubscriptionActiveStatus } from '@/libs/api'
import { getMe } from '@/libs/api/auth'
import { clearAuthStorage } from '@/libs/async-storage'
import { User } from '@/types/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type AuthSliceType = {
	user: User | null
	loading: boolean
	guestMode: boolean
	hasActiveSub: boolean
	totalApplicationUnread: number
}

const initialState: AuthSliceType = {
	user: null,
	loading: true,
	guestMode: true,
	hasActiveSub: false,
	totalApplicationUnread: 0,
}

export const getAuth = createAsyncThunk('auth/getAuth', async (_, { dispatch }) => {
	try {
		dispatch(setLoading(true))
		const userInfo = await getMe()
		return userInfo
	} catch (error) {
		return null
	} finally {
		dispatch(setLoading(false))
	}
})

export const handleLogout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
	try {
		dispatch(setUser(null))
		dispatch(setGuestMode(true))
		clearAuthStorage()
	} catch (error) {
		console.log('log out error', error)
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setGuestMode(state, action) {
			state.guestMode = action.payload
		},
		setHasActiveSub(state, action) {
			state.hasActiveSub = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAuth.fulfilled, (state, action) => {
			if (action.payload) {
				state.user = action.payload
				state.guestMode = false
				state.loading = false
			} else {
				state.loading = false
			}
		})
	},
})

export const checkSubscriptionStatus = createAsyncThunk(
	'auth/checkSubscriptionStatus',
	async (receipt?: string) => {
		try {
			const hasSub = (await checkSubscriptionActiveStatus(receipt)) as boolean
			return hasSub
		} catch (error) {
			return false
		}
	},
)

export const { setUser, setGuestMode, setLoading } = authSlice.actions
export default authSlice.reducer
