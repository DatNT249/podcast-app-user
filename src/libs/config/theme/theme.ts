import { Platform } from 'react-native'
import { DefaultTheme, useTheme } from 'react-native-paper'
import { colors } from './colors'

export const defaultTheme = {
	...DefaultTheme,
	custom: 'property',
	colors: {
		...DefaultTheme.colors,
		...colors,
	},
}

export const BANNER_HEIGHT = Platform.select({ ios: 325, android: 315 })
export const SECTION_RADIUS = 20
export const TAB_BAR_HEIGHT = Platform.OS === 'android' ? 70 : 80
export const PADDING_HORIZONTAL_CONTAINER = 10

export type AppTheme = typeof defaultTheme
export const useAppTheme = () => useTheme<AppTheme>()
