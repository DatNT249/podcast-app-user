import { BaseHeader } from '@/libs/components/Header'
import { Input } from '@/libs/components/Input'
import { useAppTheme } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import Feather from '@expo/vector-icons/Feather'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput as TextInputPaper } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useChangePasswordMutation } from '../hooks'
import { ChangePasswordSchema, ChangePasswordType } from '../types'

export const ChangPasswordScreen = () => {
	const [isHidePassword, setIsHidePassword] = useState<boolean>(true)
	const [isHideConfirmPassword, setIsHideConfirmPassword] = useState<boolean>(true)
	const handleHideConfirmPassword = () => setIsHideConfirmPassword(!isHideConfirmPassword)
	const handleHidePassword = () => setIsHidePassword(!isHidePassword)
	const { t } = useTranslation()

	const theme = useAppTheme()
	const { mutate, isPending } = useChangePasswordMutation()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ChangePasswordType>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
		},
		resolver: zodResolver(ChangePasswordSchema),
	})

	const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
		mutate(data)
	}

	return (
		<SafeAreaView style={defaultStyles.main}>
			<BaseHeader title={t('change_password.title')} />

			<KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.main}>
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								outlineColor={theme.colors.borderInput}
								styleInput={textStyles.text14}
								label={t('change_password.current_password')}
								theme={theme}
								value={value}
								onChangeText={onChange}
								secureTextEntry={isHidePassword}
								error={!!errors?.currentPassword?.message}
								helperText={errors?.currentPassword?.message}
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
						name="currentPassword"
					/>

					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<Input
								outlineColor={theme.colors.borderInput}
								styleInput={textStyles.text14}
								label={t('change_password.new_password')}
								theme={theme}
								value={value}
								onChangeText={onChange}
								secureTextEntry={isHideConfirmPassword}
								error={!!errors?.newPassword?.message}
								helperText={errors?.newPassword?.message}
								right={
									<TextInputPaper.Icon
										forceTextInputFocus={false}
										onPress={handleHideConfirmPassword}
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
						name="newPassword"
					/>

					<View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
						<Button
							mode="contained"
							style={{ borderRadius: 18, width: '100%' }}
							onPress={handleSubmit(onSubmit)}
							loading={isPending}
						>
							{t('change_password.update_password')}
						</Button>
					</View>
				</View>
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
