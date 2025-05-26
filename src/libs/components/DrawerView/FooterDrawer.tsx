import { setLanguage } from '@/libs/async-storage'
import { listLanguage } from '@/libs/config/i18n'
import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { useAppDispatch } from '@/libs/redux-store/reduxHook'
import { handleLogout } from '@/libs/redux-store/slices'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import TrackPlayer from 'react-native-track-player'

export const FooterDrawer = () => {
	const dispatch = useAppDispatch()
	const { i18n, t } = useTranslation()

	const handleLogoutPress = () => {
		Alert.alert(
			t('drawer.logout_title'),
			t('drawer.logout_message'),
			[
				{
					text: t('drawer.cancel'),
					style: 'cancel',
				},
				{
					text: t('drawer.confirm'),
					onPress: async () => {
						await TrackPlayer.reset()
						dispatch(handleLogout())
					},
					style: 'destructive',
				},
			]
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.divider} />
			
			{/* Language Selector */}
			<View style={styles.sectionContainer}>
				<View style={styles.languageHeader}>
					<View style={styles.menuIconContainer}>
						<MaterialCommunityIcons name="translate" size={22} color={colors.secondary} />
					</View>
					<Text style={styles.sectionTitle}>{t('drawer.change_language')}</Text>
				</View>

				<View style={styles.changeLanguage}>
					{listLanguage.map(({ label, value }) => (
						<Pressable
							key={value}
							onPress={() => {
								i18n.changeLanguage(value)
								setLanguage(value)
							}}
							style={[styles.languageButton, 
								i18n.language === value ? styles.activeLanguage : styles.inactiveLanguage
							]}
						>
							<Text style={i18n.language === value ? styles.activeLanguageText : styles.inactiveLanguageText}>
								{label}
							</Text>
						</Pressable>
					))}
				</View>
			</View>

			{/* Logout Button */}
			<Pressable 
				style={styles.logoutButton} 
				onPress={handleLogoutPress}
				android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: false }}
			>
				<View style={styles.logoutIconContainer}>
					<MaterialCommunityIcons name="logout" size={22} color={colors.error} />
				</View>
				<Text style={styles.logoutText}>{t('drawer.logout')}</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom: 16,
	},
	divider: {
		height: 1,
		backgroundColor: colors.border,
		marginVertical: 8,
		opacity: 0.3,
	},
	sectionContainer: {
		marginBottom: 20,
	},
	languageHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	sectionTitle: {
		...textStyles.text16,
		color: colors.text,
		fontWeight: '500',
	},
	menuIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.cardBackground,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16,
	},
	changeLanguage: {
		flexDirection: 'row',
		borderRadius: 8,
		overflow: 'hidden',
		marginLeft: 52,
		marginTop: 4,
	
	},
	languageButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		minWidth: 50,
		alignItems: 'center',
	},
	activeLanguage: {
		backgroundColor: colors.primary,
	},
	inactiveLanguage: {
		backgroundColor: colors.cardBackground,
	},
	activeLanguageText: {
		...textStyles.text14,
		color: colors.black,
		fontWeight: '600',
	},
	inactiveLanguageText: {
		...textStyles.text14,
		color: colors.textSecondary,
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: 'rgba(207, 102, 121, 0.1)',
		marginTop: 8,
	},
	logoutIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: 'rgba(207, 102, 121, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16,
	},
	logoutText: {
		...textStyles.text16,
		color: colors.error,
		fontWeight: '500',
	},
})
