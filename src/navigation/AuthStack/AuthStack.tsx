import { BeforeAuthScreen, SignInScreen, SignUpScreen } from '@/screens/AuthScreen'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS_KEY } from '../preset'
import { AuthStackParams } from './AuthStackParams'

const AuthScreens = [
	{
		name: SCREENS_KEY.AUTH.BEFORE_AUTH,
		component: BeforeAuthScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.AUTH.LOGIN,
		component: SignInScreen,
		options: { headerShown: false },
	},
	{
		name: SCREENS_KEY.AUTH.REGISTER,
		component: SignUpScreen,
		options: { headerShown: false },
	},
]

const Stack = createStackNavigator<AuthStackParams>()

export function AuthStack() {
	return (
		<Stack.Navigator>
			{AuthScreens.map((child) => (
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
