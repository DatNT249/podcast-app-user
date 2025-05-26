import { colors } from '@/libs/config/theme'
import { useRatePayer } from '@/libs/store/rate'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { BottomSheet } from '../BottomSheetModal'

type RateSetting = {
	title: string
	value: number
}

const rateSettings: RateSetting[] = [
	{
		title: '0.5X',
		value: 0.5,
	},
	{
		title: '0.75X',
		value: 0.75,
	},
	{
		title: '1X',
		value: 1,
	},
	{
		title: '1.25X',
		value: 1.25,
	},
	{
		title: '1.5X',
		value: 1.5,
	},
	{
		title: '1.75X',
		value: 1.75,
	},
	{
		title: '2X',
		value: 2,
	},
]

export const PlayerRateControl = () => {
	const { setRate, rate } = useRatePayer()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const openModal = () => {
		bottomSheetRef.current?.present()
	}
	const setRateValue = (value: number) => {
		setRate(value)
		bottomSheetRef.current?.dismiss()
	}
	const colorText = rate !== 1 ? colors.primary : colors.text
	const colorActive = (value: number) =>
		rate === value && rate !== 1 ? colors.primary : colors.text

	return (
		<View style={{ padding: 20 }}>
			<Pressable onPress={openModal}>
				<Text style={{ color: colorText }}>{rate} X</Text>
			</Pressable>

			<BottomSheet
				bottomSheetModalRef={bottomSheetRef}
				data={rateSettings}
				title="Chọn tốc độ phát"
				renderItem={({ item: { value, title } }) => (
					<Pressable onPress={() => setRateValue(value)} style={{ padding: 16 }}>
						<Text style={{ color: colorActive(value) }}>{title}</Text>
					</Pressable>
				)}
				percentage={['50%', '75%']}
			/>
		</View>
	)
}
