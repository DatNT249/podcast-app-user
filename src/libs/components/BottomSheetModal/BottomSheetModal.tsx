import { colors, useAppTheme } from '@/libs/config/theme'
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetFlatList,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { ListRenderItem, StyleSheet, Text, View } from 'react-native'

interface BottomSheetProps<T> {
	data: T[]
	title: string
	renderItem: ListRenderItem<T>
	percentage: string[]
	bottomSheetModalRef?: React.RefObject<BottomSheetModal>
}

export const BottomSheet = <T,>({
	data,
	title,
	renderItem,
	percentage,
	bottomSheetModalRef,
}: BottomSheetProps<T>) => {
	const { colors } = useAppTheme()
	const snapPoints = useMemo(() => percentage, [percentage])

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={snapPoints}
			handleIndicatorStyle={{ backgroundColor: colors.text, width: 36 }}
			handleStyle={styles.handleModal}
			backdropComponent={renderBackdrop}
		>
			<BottomSheetView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
				<BottomSheetFlatList
					data={data}
					ListHeaderComponent={
						<View style={styles.title}>
							<Text style={{ color: colors.text }}>{title}</Text>
						</View>
					}
					renderItem={renderItem}
				/>
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
	<BottomSheetBackdrop
		{...props}
		disappearsOnIndex={-1}
		appearsOnIndex={1}
		opacity={0.7}
		pressBehavior="close"
	/>
)

const styles = StyleSheet.create({
	handleModal: {
		backgroundColor: colors.backgroundMain,
		borderTopEndRadius: 12,
		borderTopStartRadius: 12,
		borderBottomWidth: 0,
	},
	title: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginBottom: 10,
	},
})
