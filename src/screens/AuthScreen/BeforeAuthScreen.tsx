import Logo from '@/assets/images/icon.png'
import { colors } from '@/libs/config/theme'
import { defaultStyles } from '@/libs/constants'
import { NavigationProp } from '@/navigation/navigation'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const BeforeAuthScreen = () => {
	const navigation = useNavigation<NavigationProp>()
	const { t } = useTranslation()

	const redirectToSignUp = () => {
		navigation.navigate('AuthStack', {
			screen: 'REGISTER',
		})
	}

	const redirectToLogin = () => {
		navigation.navigate('AuthStack', {
			screen: 'LOGIN',
		})
	}

	return (
		<SafeAreaView style={[defaultStyles.main, styles.container]}>
			<View style={styles.main}>
				<Image source={Logo} style={styles.logo} />

				<Text style={styles.title}>{t('before_auth.slogan')}</Text>
			</View>

			<View style={styles.authButton}>
				<Pressable
					style={[styles.button, { backgroundColor: colors.primary }]}
					onPress={redirectToSignUp}
				>
					<Text style={styles.buttonText}>{t('before_auth.sign_up')}</Text>
				</Pressable>
				<Pressable
					style={[styles.button, { borderWidth: 1.5, borderColor: colors.border }]}
					onPress={redirectToLogin}
				>
					<Text style={[styles.buttonText, { color: colors.text }]}>{t('sign_in.title')}</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: { position: 'relative', justifyContent: 'center', alignItems: 'center' },
	main: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 100,
	},
	title: {
		color: colors.text,
		fontWeight: 'bold',
		fontSize: 28,
		maxWidth: '80%',
		textAlign: 'center',
	},
	authButton: {
		position: 'absolute',
		bottom: 30,
		alignItems: 'center',
		left: 20,
		right: 20,
		gap: 12,
	},
	button: {
		width: '80%',
		padding: 12,
		justifyContent: 'center',
		borderRadius: 20,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: '700',
	},
})

export { BeforeAuthScreen }
