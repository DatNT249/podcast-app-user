import { TabBarIcon } from '@/libs/components'
import { FloatingAIButton } from '@/libs/components/FloatingAIButton'
import { FloatingButton } from '@/libs/components/FloatingButton'
import { FloatingPlayer } from '@/libs/components/FloatingPlayer'
import { colors } from '@/libs/config/theme'
import { device } from '@/libs/constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TABS_KEY } from '../preset'
import { MainBottomTabParamList } from './MainBottomTabParams'
import TabHome from './TabHome/HomeStack'
import { TabSearch } from './TabSearch'

const Tab = createBottomTabNavigator<MainBottomTabParamList>()

type TabBarIconProps = {
	size: number
	focused: boolean
	color: string
}

export default function BottomTabs() {
	const { t } = useTranslation()

	const tabs = [
		{
			name: TABS_KEY.TAB_HOME,
			component: TabHome,
			options: {
				tabBarIcon: ({ focused, color }: TabBarIconProps) => (
					<TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
				),
				title: t('tabs.home'),
				headerShown: false,
			},
		},
		{
			name: TABS_KEY.TAB_SEARCH,
			component: TabSearch,
			options: {
				tabBarIcon: ({ focused, color }: TabBarIconProps) => (
					<TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
				),
				title: t('tabs.search'),
				headerShown: false,
			},
		},
	]

	return (
		<Fragment>
			<Tab.Navigator
				initialRouteName={TABS_KEY.TAB_HOME}
				screenOptions={{
					tabBarShowLabel: true,
					tabBarStyle: {
						backgroundColor: colors.snackbar,
						position: 'absolute',
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						borderTopWidth: 0,
						paddingTop: device.android ? 0 : 8,
					},
				}}
			>
				{tabs.map((tab) => (
					<Tab.Screen
						key={tab.name}
						name={tab.name}
						component={tab.component}
						options={{
							...tab.options,
							tabBarActiveTintColor: colors.primary,
							tabBarInactiveTintColor: colors.text,
							tabBarLabelStyle: {
								fontSize: 12,
								fontWeight: 'bold',
							},
						}}
					/>
				))}
			</Tab.Navigator>

			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: device.iOS ? 84 : 50,
				}}
			/>

			<FloatingButton />
			{/* <FloatingAIButton /> */}
		</Fragment>
	)
}
