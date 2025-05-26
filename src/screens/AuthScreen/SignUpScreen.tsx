import { BaseHeader } from '@/libs/components/Header'
import { Input } from '@/libs/components/Input'
import { useAppTheme } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { NavigationProp } from '@/navigation/navigation'
import Feather from '@expo/vector-icons/Feather'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput as TextInputPaper } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSignUpMutation } from './hooks'
import { SignUpSchema, SignUpType } from './type'

export const SignUpScreen = () => {
	const navigation = useNavigation<NavigationProp>()
	const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
	const handleHidePassword = () => setIsHidePassword(!isHidePassword)
	const theme = useAppTheme()
	const { mutate, isPending } = useSignUpMutation()
	const { t } = useTranslation()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<SignUpType>({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
		resolver: zodResolver(SignUpSchema),
	})

	const onSubmit: SubmitHandler<SignUpType> = (data) => {
		mutate(data, {
			onSuccess: async () => {
				Alert.alert(t('sign_up.sign_up_success'), t('sign_up.please_sign_in'), [
					{
						text: t('sign_in.title'),
						onPress: () => {
							navigation.navigate('AuthStack', {
								screen: 'LOGIN',
							})
						},
					},
				])
			},
			onError: (error) => {
				Alert.alert(t('sign_up.sign_up_error'), error.message)
			},
		})
	}

	const redirectToSignIn = () => {
		navigation.navigate('AuthStack', {
			screen: 'LOGIN',
		})
	}

	return (
		<SafeAreaView style={defaultStyles.main}>
			<BaseHeader title={t('sign_up.title')} />

			<KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.main}>
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								disabled={isPending}
								outlineColor={theme.colors.border}
								styleInput={textStyles.text14}
								label={t('sign_up.name')}
								theme={theme}
								value={value}
								onChangeText={onChange}
								error={!!errors?.email?.message}
								helperText={errors?.email?.message}
							/>
						)}
						name="name"
					/>

					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								disabled={isPending}
								outlineColor={theme.colors.border}
								styleInput={textStyles.text14}
								label="Email"
								theme={theme}
								value={value}
								onChangeText={onChange}
								error={!!errors?.email?.message}
								helperText={errors?.email?.message}
							/>
						)}
						name="email"
					/>

					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								disabled={isPending}
								outlineColor={theme.colors.borderInput}
								styleInput={textStyles.text14}
								label={t('sign_in.password')}
								theme={theme}
								value={value}
								onChangeText={onChange}
								secureTextEntry={isHidePassword}
								error={!!errors?.password?.message}
								helperText={errors?.password?.message}
								right={
									<TextInputPaper.Icon
										forceTextInputFocus={false}
										onPress={handleHidePassword}
										icon={() => (
											<View>
												{isHidePassword ? (
													<Feather name="eye-off" size={24} color={theme.colors.text} />
												) : (
													<Feather name="eye" size={24} color={theme.colors.text} />
												)}
											</View>
										)}
									/>
								}
							/>
						)}
						name="password"
					/>

					<View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
						<Button
							disabled={isPending}
							loading={isPending}
							mode="contained"
							style={{ borderRadius: 18, width: '100%' }}
							onPress={handleSubmit(onSubmit)}
						>
							{t('sign_up.title')}
						</Button>
					</View>
				</View>

				<Pressable onPress={redirectToSignIn} style={{ alignItems: 'center', marginTop: 20 }}>
					<Text style={{ color: theme.colors.text }}>
						{t('sign_up.have_account')}{' '}
						<Text style={{ ...textStyles.text14, color: theme.colors.primary }}>
							{t('sign_up.sign_in')}{' '}
						</Text>
					</Text>
				</Pressable>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		paddingBottom: 20,
	},
	main: {
		paddingHorizontal: 20,
		gap: 24,
	},
})
