import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { Surface } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

interface HeaderPlayerProps {
	title?: string
}

export const HeaderPlayer = ({ title }: HeaderPlayerProps) => {
	const navigation = useNavigation()
	const onBack = () => {
		navigation.canGoBack() && navigation.goBack()
	}

	return (
		<Surface style={styles.headerContainer}>
			<StatusBar style="light" />
			<LinearGradient
				colors={[colors.primary, 'transparent']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.gradient}
			>
				{/* Back Button */}
				<Pressable 
					style={styles.backButton} 
					onPress={onBack}
					android_ripple={{  borderless: true, radius: 20 }}
				>
					<MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
				</Pressable>

				{/* Title */}
				<View style={styles.titleContainer}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
						{title ?? ''}
					</Text>
				</View>

				{/* Close Button */}
				<Pressable 
					style={styles.closeButton} 
					onPress={onBack}
					android_ripple={{ borderless: true, radius: 20 }}
				>
					<MaterialCommunityIcons name="close" size={24} color={colors.white} />
				</Pressable>
			</LinearGradient>
		</Surface>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		width: '100%',
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		overflow: 'hidden',
		elevation: 4,
		marginBottom: 8,
		backgroundColor: 'transparent',
	},
	gradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: Platform.OS === 'ios' ? 16 : 12,
		paddingHorizontal: 16,
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	title: { 
		...textStyles.text16,
		color: colors.white, 
		fontWeight: '600',
		textAlign: 'center', 
		maxWidth: '90%',
	},
	backButton: {
		padding: 8,
		borderRadius: 20,
	},
	closeButton: {
		padding: 8,
		borderRadius: 20,
	},
})
