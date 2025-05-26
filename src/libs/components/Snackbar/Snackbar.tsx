import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { useSnackbarStore } from '@/libs/store/snackbar'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Snackbar as SnackbarPaper } from 'react-native-paper'

const Snackbar = () => {
	const { visible, message, hideSnackbar } = useSnackbarStore()

	return (
		<SnackbarPaper
			wrapperStyle={{ bottom: 60 }}
			visible={visible}
			onDismiss={hideSnackbar}
			style={styles.snackbar}
			duration={SnackbarPaper.DURATION_SHORT}
		>
			<Text style={{ color: colors.white, ...textStyles.text12 }}>{message}</Text>
		</SnackbarPaper>
	)
}

const styles = StyleSheet.create({
	snackbar: {
		width: '90%',
		margin: 'auto',
		padding: 0,
		opacity: 0.9,
	},
})

export { Snackbar }
