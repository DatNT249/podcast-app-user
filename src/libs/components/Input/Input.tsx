import { colors } from '@/libs/config/theme'
import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { useTranslateMessage } from '@/libs/hooks'
import React, { useState } from 'react'
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, Animated, Pressable } from 'react-native'
import { TextInput as TextInputPaper, TextInputProps } from 'react-native-paper'

export type InputCustomProps = {
	helperText?: string
	styleInput?: StyleProp<TextStyle>
	label?: string
	containerStyle?: StyleProp<TextStyle>
	labelStyle?: StyleProp<TextStyle>
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
} & TextInputProps

const Input: React.FC<InputCustomProps> = ({ 
	helperText, 
	styleInput, 
	label, 
	containerStyle, 
	labelStyle,
	leftIcon,
	rightIcon,
	...props 
}) => {
	const { getMessageError } = useTranslateMessage()
	const theme = useAppTheme()
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (e: any) => {
		setIsFocused(true)
		if (props.onFocus) {
			props.onFocus(e)
		}
	}

	const handleBlur = (e: any) => {
		setIsFocused(false)
		if (props.onBlur) {
			props.onBlur(e)
		}
	}

	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<Text 
					style={[
						styles.label, 
						{ 
							color: props.error ? colors.error : (isFocused ? colors.primary : colors.textSecondary),
						},
						labelStyle
					]}
				>
					{label}
				</Text>
			)}

			<View style={styles.inputWrapper}>
				{leftIcon && (
					<View style={styles.iconContainer}>
						{leftIcon}
					</View>
				)}

				<TextInputPaper
					mode="outlined"
					placeholderTextColor={colors.placeholder}
					style={[styles.input, props.error && styles.inputError]}
					outlineColor={props.error ? colors.error : (isFocused ? colors.primary : colors.border)}
					activeOutlineColor={props.error ? colors.error : colors.primary}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
					render={(innerProps) => (
						<TextInput
							{...innerProps}
							style={[
								innerProps.style, 
								styles.text, 
								styleInput, 
								{ padding: props.multiline ? 12 : 0 },
								leftIcon && styles.inputWithLeftIcon
							]}
						/>
					)}
				/>

				{rightIcon && (
					<View style={styles.rightIconContainer}>
						{rightIcon}
					</View>
				)}
			</View>

			{helperText && props.error && (
				<Text style={styles.helperText}>{getMessageError(helperText)}</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 6,
		marginBottom: 8,
	},
	label: {
		...textStyles.text14,
		fontWeight: '500',
		marginLeft: 4,
		letterSpacing: 0.25,
	},
	inputWrapper: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		...textStyles.text14,
		borderWidth: 0,
		padding: 0,
		backgroundColor: colors.cardBackground,
		flex: 1,
		borderRadius: 8,
		minHeight: 56,
	},
	inputError: {
		borderColor: colors.error,
	},
	text: {
		includeFontPadding: false,
		paddingBottom: 0,
		fontSize: 16,
		color: colors.text,
		letterSpacing: 0.15,
	},
	helperText: {
		color: colors.error,
		fontSize: 12,
		includeFontPadding: false,
		marginLeft: 4,
		marginTop: 2,
	},
	iconContainer: {
		position: 'absolute',
		left: 12,
		zIndex: 2,
	},
	rightIconContainer: {
		position: 'absolute',
		right: 12,
		zIndex: 2,
	},
	inputWithLeftIcon: {
		paddingLeft: 40,
	},
})

export { Input }
