import { DrawerView, Snackbar } from '@/libs/components'
import { useGetLocalLanguage } from '@/libs/hooks'
import { useAppSelector } from '@/libs/redux-store/reduxHook'
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Fragment, useRef } from 'react'
import { View } from 'react-native'
import { AuthStack } from './AuthStack'
import BottomTabs from './BottomTabs/Tabs'
import { PlayerStack } from './PlayerStack'
import { navigationRef } from './RootNavigation'
import { RootStackParamList } from './RootStackParamList'

export type NavigationProp = DrawerNavigationProp<RootStackParamList>
const RootDrawer = createDrawerNavigator<RootStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

function Navigation() {
	const routeNameRef = useRef<string>()
	const { user, loading } = useAppSelector((state) => state.auth)

	useGetLocalLanguage()

	function renderScreens() {
		if (loading && !user) {
			return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
		}

		return user ? (
			<Fragment>
				<RootDrawer.Navigator
					screenOptions={{ headerShown: false }}
					drawerContent={(props) => <DrawerView {...props} />}
				>
					<RootDrawer.Group>
						<RootDrawer.Screen name="BottomTabs" component={BottomTabs} />
						<RootStack.Screen name="PlayerStack" component={PlayerStack} />
					</RootDrawer.Group>
				</RootDrawer.Navigator>
			</Fragment>
		) : (
			<RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
				<RootStack.Group>
					<RootStack.Screen name="AuthStack" component={AuthStack} />
				</RootStack.Group>
			</RootStack.Navigator>
		)
	}

	return (
		<NavigationContainer
			onReady={() => {
				routeNameRef.current = navigationRef.getCurrentRoute()?.name
			}}
			ref={navigationRef}
		>
			{renderScreens()}

			<Snackbar />
		</NavigationContainer>
	)
}

export default Navigation
