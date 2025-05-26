import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'
import { Button as PaperButton, Divider, Surface } from 'react-native-paper'
import { Modal } from '../Modal'
import { Button } from '../Button'

export type DataSelectType = {
	value: string
	label: string
}

type SelectProps = {
	data: DataSelectType[]
	value: string
	onChange: (value: string) => void
	error?: boolean
	helperText?: string
	title?: string
	styleInput?: StyleProp<TextStyle>
	style?: StyleProp<ViewStyle>
	placeholder?: string
}

const Select: React.FC<SelectProps> = ({
	data,
	value,
	onChange,
	error = false,
	helperText,
	title,
	placeholder,
	styleInput,
	style,
}) => {
	const [open, setOpen] = useState(false)
	const [checkedItem, setCheckedItem] = useState<string>()
	const { t } = useTranslation()

	const handleOnPress = (item: DataSelectType) => {
		handleCheckedItem(item)
		onChange(item.value as string)
	}

	const renderItem: ListRenderItem<DataSelectType> = ({ item }) => {
		const checked = checkedItem === item.value

		return (
			<Pressable
				onPress={() => handleOnPress(item)}
				style={({pressed}) => [styles.optionItem, pressed && styles.optionItemPressed]}
				android_ripple={{ color: colors.ripple, borderless: false }}
			>
				<Text style={[styles.optionText, checked && styles.optionTextSelected]}>
					{item.label}
				</Text>

				{checked && (
					<MaterialCommunityIcons name="check" size={20} color={colors.primary} />
				)}
			</Pressable>
		)
	}

	const handleCheckedItem = (item: DataSelectType) => {
		setCheckedItem(item.value as string)
	}

	useEffect(() => {
		if (value) {
			setCheckedItem(value)
		}
	}, [value])

	return (
		<View style={[styles.selectWrapper, style]}>
			{title && (
				<Text style={styles.labelText}>
					{title}
				</Text>
			)}

			<Surface 
				style={[
					styles.container,
					error && styles.containerError
				]}
			>
				<Pressable 
					style={styles.wrapContent}
					onPress={() => setOpen(true)}
					android_ripple={{ color: colors.ripple, borderless: false, radius: 28 }}
				>
					<MaterialCommunityIcons 
						name={checkedItem ? "check-circle-outline" : "circle-outline"} 
						size={18} 
						color={checkedItem ? colors.primary : colors.textSecondary} 
						style={styles.leftIcon}
					/>
					<Text
						style={[
							styles.valueText,
							!checkedItem && styles.placeholderText,
							styleInput,
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{data?.find((item) => item.value === checkedItem)?.label || placeholder}
					</Text>
					
					<MaterialCommunityIcons 
						name="chevron-down" 
						size={22} 
						color={colors.textSecondary}
						style={styles.rightIcon} 
					/>
				</Pressable>

				<Modal
					title={title || t('common.select_option')}
					isVisible={open}
					onCloseModal={() => setOpen(false)}
					content={
						<Surface style={styles.modalContent}>
							<View style={styles.listContainer}>
								<FlashList
									data={data}
									renderItem={renderItem}
									estimatedItemSize={56}
									extraData={checkedItem}
									showsVerticalScrollIndicator={false}
									ListHeaderComponent={<View style={styles.listHeader} />}
									ListFooterComponent={<View style={styles.listFooter} />}
									ItemSeparatorComponent={() => <Divider style={styles.itemSeparator} />}
								/>
							</View>

							<View style={styles.buttonContainer}>
								<Button
									title={t('common.close')}
									onPress={() => setOpen(false)}
									mode="contained"
									size="medium"
									icon={<MaterialCommunityIcons name="check" size={18} color={colors.white} />}
								/>
							</View>
						</Surface>
					}
				/>
			</Surface>
			{helperText && error && (
				<Text style={styles.helperText}>{helperText}</Text>
			)}
		</View>
	
	)
}

export { Select }

const styles = StyleSheet.create({
	// Wrapper styles
	selectWrapper: {
		marginBottom: 8,
	},
	labelText: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '600',
		marginBottom: 8,
		marginLeft: 4,
	},

	// Select field styles
	container: {
		borderRadius: 12,
		backgroundColor: colors.cardBackground,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.5,
		overflow: 'hidden',
	},
	containerError: {
		borderWidth: 1,
		borderColor: colors.error,
	},
	wrapContent: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		minHeight: 56,
	},
	leftIcon: {
		marginRight: 12,
	},
	rightIcon: {
		marginLeft: 'auto',
	},
	valueText: {
		...textStyles.text16,
		color: colors.text,
		flex: 1,
	},
	placeholderText: {
		color: colors.textSecondary,
		opacity: 0.7,
	},

	// Item styles
	optionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
	},
	optionItemPressed: {
		backgroundColor: colors.backgroundPressed,
	},
	optionText: {
		...textStyles.text16,
		color: colors.text,
	},
	optionTextSelected: {
		color: colors.primary,
		fontWeight: '500',
	},
	itemSeparator: {
		backgroundColor: colors.border,
		opacity: 0.2,
	},

	// Modal styles
	modalContent: {
		backgroundColor: colors.backgroundElevated,
		paddingBottom: 16,
	},
	listContainer: {
		height: 300,
	},
	listHeader: {
		height: 8,
	},
	listFooter: {
		height: 8,
	},
	buttonContainer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		alignItems: 'center',
	},

	// Helper text
	helperText: {
		...textStyles.helperText,
		color: colors.error,
		marginLeft: 4,
		marginTop: 4,
	},
})
