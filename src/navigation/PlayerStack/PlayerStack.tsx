import { PlayerScreen } from '@/screens'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { PlayerStackParams } from './PlayerStackParams'

const PlayerScreens = [
	{
		name: SCREENS_KEY.PLAYER.PLAYER,
		component: PlayerScreen,
		options: { headerShown: false },
	},
]

const Stack = createStackNavigator<PlayerStackParams>()

export function PlayerStack() {
	return (
		<Stack.Navigator>
			{PlayerScreens.map((child) => (
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
