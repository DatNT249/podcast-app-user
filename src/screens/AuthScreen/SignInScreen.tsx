import { setAccessToken } from '@/libs/async-storage'
import { Button } from '@/libs/components/Button'
import { BaseHeader } from '@/libs/components/Header'
import { Input } from '@/libs/components/Input'
import { GradientBackground } from '@/libs/components/LinearGradient'
import { colors, useAppTheme } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { useAppDispatch } from '@/libs/redux-store/reduxHook'
import { setUser } from '@/libs/redux-store/slices'
import { NavigationProp } from '@/navigation/navigation'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Surface, TextInput as TextInputPaper } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSignInMutation } from './hooks'
import { SignInSchema, SignInType } from './type'

export const SignInScreen = () => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation<NavigationProp>()
	const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
	const handleHidePassword = useCallback(() => setIsHidePassword(!isHidePassword), [isHidePassword])
	const { mutate, isPending } = useSignInMutation()
	const { t } = useTranslation()
	const theme = useAppTheme()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInType>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(SignInSchema),
	})

	const onSubmit: SubmitHandler<SignInType> = (data) => {
		mutate(data, {
			onSuccess: async (data) => {
				const { user, accessToken } = data
				await setAccessToken(accessToken)
				dispatch(setUser(user))
			},
			onError: () => {
				Alert.alert(t('sign_in.error'))
			},
		})
	}

	const redirectToSignUp = useCallback(() => {
		navigation.navigate('AuthStack', {
			screen: 'REGISTER',
		})
	}, [navigation])

	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" backgroundColor={colors.background} />
			<GradientBackground
				colors={[colors.background, colors.backgroundElevated]}
				locations={[0, 0.8]}
			>
				<SafeAreaView style={[defaultStyles.main, { backgroundColor: 'transparent' }]}>
					<BaseHeader title={t('sign_in.title')} />

					<KeyboardAwareScrollView 
						contentContainerStyle={styles.scrollContainer}
						showsVerticalScrollIndicator={false}
					>
						{/* Logo/Branding Section */}
						<View style={styles.logoContainer}>
							<View style={styles.logoWrapper}>
								<Surface style={styles.logoCircle} elevation={8}>
									<MaterialCommunityIcons name="headphones" size={48} color={colors.primary} />
								</Surface>
							</View>
							<Text style={[styles.appTitle, { color: colors.primary }]}>AI Podcast</Text>
						</View>

						{/* Form Container */}
						<Surface 
							style={[styles.formContainer, { backgroundColor: colors.cardBackground }]} 
							elevation={4}
						>
							<View style={styles.formContent}>
								{/* Email Field */}
								<View style={styles.inputContainer}>
									<Controller
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												styleInput={[textStyles.text14, styles.input, { color: colors.text }]}
												value={value}
												onChangeText={onChange}
												error={!!errors?.email?.message}
												helperText={errors?.email?.message}
												label={t('sign_in.email')}
												placeholder={t('sign_in.email')}
												leftIcon={<MaterialCommunityIcons name="email-outline" size={24} color={colors.primary} />}
											/>
										)}
										name="email"
									/>
								</View>

								{/* Password Field */}
								<View style={styles.inputContainer}>
									<Controller
										control={control}
										render={({ field: { onChange, value } }) => (
											<Input
												label={t('sign_in.password')}
												placeholder={t('sign_in.password')}
												value={value}
												onChangeText={onChange}
												secureTextEntry={isHidePassword}
												error={!!errors?.password?.message}
												leftIcon={<MaterialCommunityIcons name="lock-outline" size={20} color={colors.primary} />}
												rightIcon={
													<Pressable onPress={handleHidePassword}>
														<MaterialCommunityIcons 
															name={isHidePassword ? 'eye-off' : 'eye'} 
															size={20} 
															color={colors.primary} 
														/>
													</Pressable>
												}
												mode="outlined"
											/>
										)}
										name="password"
									/>
								</View>

								

								{/* Sign In Button */}
								<View style={styles.buttonContainer}>
									<Button
										mode="contained"
										style={styles.signInButton}
										title={t('sign_in.title') || 'Sign In'}
										onPress={handleSubmit(onSubmit)}
										loading={isPending}
										fullWidth
										size="large"
									/>
								</View>
							</View>
						</Surface>

						{/* Sign Up Link */}
						<Pressable onPress={redirectToSignUp} style={styles.signUpContainer}>
							<Text style={[styles.signUpText, { color: colors.textSecondary }]}>
								{t('sign_in.not_account') || 'Don\'t have an account?'}{' '}
								<Text style={[styles.signUpLink, { color: colors.secondary }]}>
									{t('sign_in.sign_up') || 'Sign Up'}
								</Text>
							</Text>
						</Pressable>
					</KeyboardAwareScrollView>
				</SafeAreaView>
			</GradientBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		paddingBottom: 40,
		paddingHorizontal: 20,
	},
	main: {
		paddingHorizontal: 20,
		gap: 24,
	},
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	logoWrapper: {
		width: 120,
		height: 120,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	logoCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(30, 30, 30, 0.9)',
		borderWidth: 2,
		borderColor: 'rgba(187, 134, 252, 0.3)',
	},
	appTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 12,
		letterSpacing: 1,
	},
	welcomeText: {
		fontSize: 16,
		opacity: 0.8,
		letterSpacing: 0.5,
	},
	formContainer: {
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 32,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	formContent: {
		padding: 24,
		gap: 24,
	},
	inputContainer: {
		gap: 16,
		marginBottom: 8,
	},
	inputLabel: {
		fontSize: 14,
		fontWeight: '500',
		marginLeft: 4,
		letterSpacing: 0.5,
	},
	input: {
		fontSize: 16,
	},
	inputField: {
		borderRadius: 8,
		height: 56,
		overflow: 'hidden',
	},
	forgotPasswordContainer: {
		alignSelf: 'flex-end',
		marginTop: 4,
		marginRight: 4,
	},
	forgotPasswordText: {
		fontSize: 14,
		fontWeight: '500',
	},
	buttonContainer: {
		marginTop: 16,
		width: '100%',
	},
	signInButton: {
		borderRadius: 16,
		height: 56,
	},
	signUpContainer: {
		alignItems: 'center',
		marginTop: 16,
		marginBottom: 20,
	},
	signUpText: {
		fontSize: 14,
		letterSpacing: 0.5,
	},
	signUpLink: {
		fontSize: 14,
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
})
