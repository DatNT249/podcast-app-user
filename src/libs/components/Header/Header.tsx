import { colors } from '@/libs/config/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
	title?: string
	onBack?: () => void
	showBack?: boolean
}

const Header = ({ title, onBack, showBack }: Props) => {
	const router = useNavigation()

	return (
		<SafeAreaView>
			<StatusBar barStyle="light-content" />

			<View style={styles.container}>
				<TouchableOpacity onPress={onBack ? onBack : () => router.goBack()}>
					{showBack && (
						<View style={styles.backBtn}>
							<Ionicons name="chevron-back" size={24} color={colors.text} />
						</View>
					)}
				</TouchableOpacity>

				{title && (
					<View style={styles.titleContainer}>
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							{title}
						</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 44,
		position: 'relative',
	},
	backBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 1000,
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingRight: 24,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		width: '60%',
		color: colors.text,
		fontSize: 16,
	},
})

export { Header }
