import { combineReducers } from 'redux'

import authReducer from './slices/authSlice'

const reducers = combineReducers({
	auth: authReducer,
})

export default reducers
