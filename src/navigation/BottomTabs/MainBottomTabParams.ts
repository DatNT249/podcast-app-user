import { SCREENS_KEY } from '../preset'

export type MainBottomTabParamList = {
	TAB_HOME: {
		screen:
			| typeof SCREENS_KEY.HOME.INDEX
			| typeof SCREENS_KEY.HOME.CHAPTER
			| typeof SCREENS_KEY.HOME.EPISODE
			| typeof SCREENS_KEY.HOME.CHANGE_PROFILE
			| typeof SCREENS_KEY.HOME.FAVORITE
			| typeof SCREENS_KEY.HOME.CHANGE_PASSWORD
			| typeof SCREENS_KEY.HOME.GENRE_DETAIL
			| typeof SCREENS_KEY.HOME.SUBSCRIPTION
		params?: {
			id?: string
		}
	}
	TAB_SEARCH: undefined
	TAB_SUBSCRIPTION: {
		screen:
			| typeof SCREENS_KEY.SUBSCRIPTION.INDEX
			| typeof SCREENS_KEY.SUBSCRIPTION.REGISTER
			| typeof SCREENS_KEY.SUBSCRIPTION.HISTORY
			| typeof SCREENS_KEY.SUBSCRIPTION.STOP
		params?: {
			receipt?: string
		}
	}
}
