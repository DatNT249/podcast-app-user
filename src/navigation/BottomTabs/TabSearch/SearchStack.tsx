import { SearchScreen } from '@/screens'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../../preset'
import { SearchStackParams } from './SearchStackParams'

const SearchScreens = [
	{
		name: SCREENS_KEY.SEARCH.INDEX,
		component: SearchScreen,
		options: { headerShown: false },
	},
]

const Stack = createStackNavigator<SearchStackParams>()

export function TabSearch() {
	return (
		<Stack.Navigator>
			{SearchScreens.map((child) => (
				<Stack.Screen
					key={child.name}
					name={child.name}
					component={child.component}
					options={child.options}
				/>
			))}
		</Stack.Navigator>
	)
}
