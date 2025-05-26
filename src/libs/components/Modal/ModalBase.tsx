import React from 'react'
import { StyleSheet, View } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { Text } from 'react-native-paper'
import { colors } from '@/libs/config/theme'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
	isVisible: boolean
	onCloseModal?: () => void
	title?: string
	description?: string
	titleStyle?: any
	descriptionStyle?: any
	modalProps?: ModalProps
	children?: JSX.Element | JSX.Element[]
	onBackDropPress?: () => void
}

const ModalBase: React.FC<Props> = ({
	isVisible,
	onCloseModal,
	title,
	description,
	children,
	titleStyle,
	descriptionStyle,
	onBackDropPress,
	modalProps,
}) => {
	return (
		<Modal
			isVisible={isVisible}
			style={styles.container}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropColor={colors.background}
			backdropOpacity={0.9}
			animationInTiming={300}
			animationOutTiming={300}
			backdropTransitionInTiming={300}
			backdropTransitionOutTiming={300}
			onBackdropPress={onBackDropPress || onCloseModal}
			{...modalProps}
		>
			<View style={styles.content}>
				{title && (
					<LinearGradient
						colors={[colors.primary, colors.primaryDark]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.headerGradient}
					>
						<Text style={[styles.title, titleStyle]}>{title}</Text>
					</LinearGradient>
				)}
				<View style={children ? [styles.body, { paddingVertical: 16 }] : styles.body}>
					{description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
					{children && children}
				</View>
			</View>
		</Modal>
	)
}

export { ModalBase }

const styles = StyleSheet.create({
	container: {
		margin: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

	content: {
		backgroundColor: colors.backgroundElevated,
		borderRadius: 16,
		width: '92%',
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},

	headerGradient: {
		paddingVertical: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},

	body: {
		paddingHorizontal: 20,
		paddingVertical: 16,
	},

	title: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '600',
		color: colors.white,
	},

	description: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10,
		color: colors.text,
		lineHeight: 22,
	},
})
