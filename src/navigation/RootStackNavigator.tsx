import { DrawerView } from '@/libs/components'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { AuthStack } from './AuthStack'
import BottomTabs from './BottomTabs/Tabs'
import { PlayerStack } from './PlayerStack'
import { RootStackParamList } from './RootStackParamList'

const RootDrawer = createDrawerNavigator<RootStackParamList>()

interface RootStackNavigatorProps {
	isAuthenticated: boolean
}

const RootStackNavigator: React.FC<RootStackNavigatorProps> = ({ isAuthenticated }) => {
	return (
		<RootDrawer.Navigator
			screenOptions={{ headerShown: false }}
			drawerContent={(props) => <DrawerView {...props} />}
		>
			<RootDrawer.Group>
				{isAuthenticated ? (
					<>
						<RootDrawer.Screen name="BottomTabs" component={BottomTabs} />
						<RootDrawer.Screen name="PlayerStack" component={PlayerStack} />
					</>
				) : (
					<RootDrawer.Screen name="AuthStack" component={AuthStack} />
				)}
			</RootDrawer.Group>
		</RootDrawer.Navigator>
	)
}

export default RootStackNavigator
