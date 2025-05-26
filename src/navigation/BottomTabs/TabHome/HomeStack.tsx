import { SCREENS_KEY } from '@/navigation/preset'
import {
	BookScreen,
	ChangPasswordScreen,
	ChapterScreen,
	EpisodeScreen,
	GenreScreen,
} from '@/screens/BookScreen'
import { ChangeProfileScreen } from '@/screens/ChangeProfileScreen/views'
import { FavoriteScreen } from '@/screens/FavoriteScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeStackParams } from './HomeStackParams'

const HomeScreens = [
	{
		name: SCREENS_KEY.HOME.INDEX,
		component: BookScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.CHAPTER,
		component: ChapterScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.EPISODE,
		component: EpisodeScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.CHANGE_PROFILE,
		component: ChangeProfileScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.FAVORITE,
		component: FavoriteScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.CHANGE_PASSWORD,
		component: ChangPasswordScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.HOME.GENRE_DETAIL,
		component: GenreScreen,
		options: { headerShown: false },
	},
]

const HomeStack = createStackNavigator<HomeStackParams>()

export default function TabHome() {
	return (
		<HomeStack.Navigator>
			{HomeScreens.map((child) => (
				<HomeStack.Screen
					key={child.name}
					name={child.name}
					component={child.component}
					options={child.options}
				/>
			))}
		</HomeStack.Navigator>
	)
}
