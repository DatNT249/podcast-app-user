import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { formatSecondsToMinutes } from '@/libs/helpers/miscellaneous'
import { TIME_TO_CHECK_PREMIUM } from '@/libs/hooks'
import { Alert, StyleSheet, Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useActiveTrack, useProgress } from 'react-native-track-player'

export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)
	const activeTrack = useActiveTrack()

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	const handleValueChange = async (value: number) => {
		if (value * duration >= TIME_TO_CHECK_PREMIUM && activeTrack?.isPremium) {
			Alert.alert('Thông báo', 'Bạn cần thanh toán để nghe tiếp')
		} else {
			await TrackPlayer.seekTo(value * duration)
		}
	}

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				containerStyle={styles.slider}
				thumbWidth={0}
				renderBubble={() => null}
				theme={{
					minimumTrackTintColor: colors.text,
					maximumTrackTintColor: colors.maximumTrackTintColor,
				}}
				onSlidingStart={() => (isSliding.value = true)}
				onValueChange={handleValueChange}
				onSlidingComplete={async (value) => {
					if (!isSliding.value) return

					isSliding.value = false

					await TrackPlayer.seekTo(value * duration)
				}}
				disable={activeTrack?.isPremium}
			/>

			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>

				<Text style={styles.timeText}>
					{'-'} {trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 8,
	},
	timeText: {
		color: colors.text,
		...textStyles.text10,
	},
	slider: {
		height: 7,
		borderRadius: 12,
	},
})
