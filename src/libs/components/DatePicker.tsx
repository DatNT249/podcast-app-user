import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { formatDate } from '@/libs/helpers/format'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { Fragment, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, Platform, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import RNDatePicker, { DatePickerProps } from 'react-native-date-picker'
import { Input, InputCustomProps } from './Input/Input'

type Props = {
	helperText?: string
	onChangeDate?: (date: Date | string) => void
	datePickerProps?: Omit<DatePickerProps, 'date' | 'onConfirm' | 'onCancel'>
	label?: string
} & InputCustomProps

const DatePicker: React.FC<Props> = ({
	helperText,
	onChangeDate,
	value,
	datePickerProps,
	label,
	...props
}) => {
	const [open, setOpen] = useState(false)
	const { t } = useTranslation()

	const handleOpenModal = () => {
		Keyboard.dismiss()
		setOpen(true)
	}

	const onChange = useCallback(
		(date: Date) => {
			onChangeDate && onChangeDate(date.toString())
		},
		[onChangeDate],
	)

	// Calendar icon for the input
	const calendarIcon = (
		<MaterialCommunityIcons 
			name="calendar-month-outline" 
			size={20} 
			color={colors.primary} 
		/>
	)

	return (
		<Fragment>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={handleOpenModal}
				style={styles.datePickerWrapper}
			>
				<Input
					helperText={helperText}
					value={value ? formatDate(value, 'dd/MM/yyyy') : ''}
					placeholder={t('common.date_placeholder')}
					label={label || t('common.choose_date')}
					placeholderTextColor={colors.placeholder}
					styleInput={styles.inputText}
					rightIcon={calendarIcon}
					editable={false}
					pointerEvents="none"
					{...props}
				/>
			</TouchableOpacity>
			<RNDatePicker
				modal
				mode="date"
				open={open}
				date={value ? new Date(value) : new Date()}
				onConfirm={(d) => {
					setOpen(false)
					onChange(d)
				}}
				onCancel={() => {
					setOpen(false)
				}}
				// Theme customization
				title={t('common.select_date')}
				confirmText={t('common.confirm')}
				cancelText={t('common.cancel')}
				theme="dark"
				{...datePickerProps}
			/>
		</Fragment>
	)
}

const styles = StyleSheet.create({
	datePickerWrapper: {
		width: '100%',
	},
	inputText: {
		...textStyles.text16,
		color: colors.text,
		paddingRight: 36, // Make space for the calendar icon
	},
})

export { DatePicker }
