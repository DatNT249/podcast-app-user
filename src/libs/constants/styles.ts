import { StyleSheet } from 'react-native'
import { colors } from '../config/theme'

export const defaultStyles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	text: {
		fontSize: 16,
		color: '#000',
	},
	main: {
		flex: 1,
		backgroundColor: colors.background,
	},
})

export const fontSize = {
	xs: 12,
	sm: 16,
	base: 20,
	lg: 24,
}

export const screenPadding = {
	horizontal: 12,
}

export const textStyles = StyleSheet.create({
	text10: {
		fontSize: 10,
		includeFontPadding: false,
		lineHeight: 16,
	},
	textUnderline: {
		textDecorationLine: 'underline',
		includeFontPadding: false,
	},
	text14: {
		fontSize: 14,
		includeFontPadding: false,
		lineHeight: 14,
	},
	text16: {
		fontSize: 16,
		includeFontPadding: false,
		lineHeight: 20,
	},
	text12: {
		fontSize: 12,
		includeFontPadding: false,
		lineHeight: 18,
	},
	text12_regular: {
		fontSize: 12,
		includeFontPadding: false,
		lineHeight: 18,
	},
	content16: {
		fontSize: 16,
		includeFontPadding: false,
	},
	text12_thin: {
		fontSize: 12,
		includeFontPadding: false,
		lineHeight: 18,
	},
	helperText: {
		color: '#ff4400ec',
		fontSize: 12,
		includeFontPadding: false,
	},
	title: {
		fontSize: 30,
		includeFontPadding: false,
		fontWeight: 'bold',
	},
	text18: {
		fontSize: 18,
		includeFontPadding: false,
		lineHeight: 26,
	},
	text20: {
		fontSize: 20,
		includeFontPadding: false,
		lineHeight: 28,
	},
})

export const utilsStyles = StyleSheet.create({
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemSeparator: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.3,
	},
	emptyContentText: {
		...defaultStyles.text,
		color: colors.textMuted,
		textAlign: 'center',
		marginTop: 20,
	},
	emptyContentImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 40,
		opacity: 0.3,
	},
})
