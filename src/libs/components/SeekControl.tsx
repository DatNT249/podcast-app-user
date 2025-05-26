import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Pressable, View, ViewProps } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { useAppTheme } from '../config/theme'

const SEEK_INTERVAL = 10

const seekForward = async () => {
	try {
		const currentPosition = await TrackPlayer.getPosition()
		await TrackPlayer.seekTo(currentPosition + SEEK_INTERVAL)
	} catch (error) {
		console.error('Error seeking forward:', error)
	}
}

const seekBackward = async () => {
	try {
		const currentPosition = await TrackPlayer.getPosition()
		const newPosition = Math.max(currentPosition - SEEK_INTERVAL, 0)
		await TrackPlayer.seekTo(newPosition)
	} catch (error) {
		console.error('Error seeking backward:', error)
	}
}

const SeekBackwardButton = (style: ViewProps) => {
	const { colors } = useAppTheme()

	return (
		<View style={style}>
			<Pressable onPress={seekBackward}>
				<MaterialIcons name="replay-10" size={30} color={colors.text} />
			</Pressable>
		</View>
	)
}

const SeekForwardButton = (style: ViewProps) => {
	const { colors } = useAppTheme()

	return (
		<View style={style}>
			<Pressable onPress={seekForward}>
				<MaterialIcons name="forward-10" size={30} color={colors.text} />
			</Pressable>
		</View>
	)
}

export { SeekBackwardButton, SeekForwardButton }
