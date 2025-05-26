import { colors } from '@/libs/config/theme'
import { FontAwesome6 } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { PlayerRateControl } from './PlayerRateControl'
import { PlayerSleepTimer } from './PlayerSleepTimer'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<PlayerRateControl />

				<SkipToPreviousButton />

				<PlayPauseButton
					iconSize={40}
					style={{ width: 36, justifyContent: 'center', alignItems: 'center' }}
				/>

				<SkipToNextButton />

				<PlayerSleepTimer />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<AntDesign name="stepforward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<AntDesign name="stepbackward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
