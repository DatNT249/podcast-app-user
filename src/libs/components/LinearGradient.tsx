import { colors as themeColor } from '@/libs/config/theme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

export interface LinearGradientHeaderProps {
	colors?: string[]
}

export interface GradientBackgroundProps {
	colors?: string[]
	style?: StyleProp<ViewStyle>
	start?: { x: number; y: number }
	end?: { x: number; y: number }
	children?: React.ReactNode
	locations?: number[]
}

const LinearGradientHeader = ({
	colors = [themeColor.primary, 'transparent'],
}: LinearGradientHeaderProps) => {
	return <LinearGradient colors={colors} style={styles.headerBackground} />
}

const GradientBackground = ({
	colors = [themeColor.gradientStart, themeColor.gradientEnd],
	style,
	start = { x: 0, y: 0 },
	end = { x: 0, y: 1 },
	children,
	locations,
}: GradientBackgroundProps) => {
	return (
		<LinearGradient
			colors={colors}
			style={[styles.fullScreenGradient, style]}
			start={start}
			end={end}
			locations={locations}
		>
			{children}
		</LinearGradient>
	)
}

// Predefined gradient styles
const darkGradient = () => (
	<GradientBackground
		colors={[themeColor.background, themeColor.backgroundElevated]}
		locations={[0, 0.8]}
	/>
)

const purpleGradient = () => (
	<GradientBackground
		colors={[themeColor.primaryDark, themeColor.background]}
		locations={[0, 0.6]}
	/>
)

export { 
	LinearGradientHeader, 
	GradientBackground,
	darkGradient,
	purpleGradient
}

const styles = StyleSheet.create({
	headerBackground: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '30%',
	},
	fullScreenGradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
	},
})
