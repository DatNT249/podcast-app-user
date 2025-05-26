import { BottomSheet } from '@/libs/components/BottomSheetModal'
import { useAppTheme } from '@/libs/config/theme'
import { useFormatTime } from '@/libs/hooks'
import { useBookTimer } from '@/libs/store/timer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

type TimerDuration = {
	title: string
	onPress?: () => void
}

export const PlayerSleepTimer = () => {
	const { isTimerActive, setTimer, timeLeft, isPlayingEndBook } = useBookTimer()
	const { colors } = useAppTheme()
	const ref = React.useRef<BottomSheetModal>(null)
	const { t } = useTranslation()
	const openModal = () => {
		ref.current?.present()
	}
	const closeModal = () => {
		ref.current?.dismiss()
	}
	const { formatTime } = useFormatTime()

	const listTimerDuration: TimerDuration[] = [
		{
			title: `5 ${t('minute')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 300 }),
		},
		{
			title: `10 ${t('timer.minute')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 600 }),
		},
		{
			title: `15 ${t('timer.minute')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 900 }),
		},
		{
			title: `30 ${t('timer.minute')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 1800 }),
		},
		{
			title: `45 ${t('timer.minute')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 2700 }),
		},
		{
			title: `1 ${t('timer.hour')}`,
			onPress: () => setTimer({ isTimerActive: true, timerDuration: 3600 }),
		},
		{
			title: t('timer.end_of_episode'),
			onPress: () => setTimer({ isTimerActive: false, timerDuration: 0, isPlayingEndBook: true }),
		},
	]

	return (
		<View style={{ padding: 20 }}>
			<Pressable onPress={openModal}>
				<MaterialCommunityIcons
					name={isTimerActive || isPlayingEndBook ? 'timer' : 'timer-outline'}
					size={24}
					color={isTimerActive || isPlayingEndBook ? colors.primary : colors.text}
				/>
			</Pressable>

			<BottomSheet
				bottomSheetModalRef={ref}
				data={listTimerDuration}
				title={
					isTimerActive
						? `${t('timer.turn_off')} ${formatTime(timeLeft)}`
						: isPlayingEndBook
							? t('timer.end_of_episode')
							: t('timer.sleep_timer')
				}
				renderItem={({ item: { title, onPress } }) => (
					<Pressable
						onPress={() => {
							onPress && onPress()
							closeModal()
						}}
						style={{ padding: 16 }}
					>
						<Text style={{ color: colors.text }}>{title}</Text>
					</Pressable>
				)}
				percentage={['25%', '75%']}
			/>
		</View>
	)
}
