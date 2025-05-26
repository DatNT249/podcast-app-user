import { Avatar } from '@/libs/components'
import { MovingText } from '@/libs/components/MovingText'
import { colors } from '@/libs/config/theme'
import { device, textStyles } from '@/libs/constants'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const HeaderBookScreen = () => {
	const navigation = useNavigation<NavigationProp>()
	const { t } = useTranslation()
	const { top } = useSafeAreaInsets()

	return (
		<View style={{ paddingTop: device.android ? top : 0 }}>
			<View style={styles.container}>
				<Avatar size={32} onPress={() => navigation.openDrawer()} />

				<MovingText text={t('home.welcome')} animationThreshold={1000} style={styles.movingTitle} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		height: 44,
		gap: 12,
	},
	actionButton: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 14,
		paddingHorizontal: 14,
		paddingVertical: 4,
	},
	movingTitle: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '600',
	},
})
