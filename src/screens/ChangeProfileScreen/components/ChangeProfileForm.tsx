import { Button } from '@/libs/components/Button'
import { DatePicker } from '@/libs/components/DatePicker'
import { Input } from '@/libs/components/Input'
import { Select } from '@/libs/components/Select'
import { colors, useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { formatDate } from '@/libs/helpers/format'
import { useAppDispatch, useAppSelector } from '@/libs/redux-store/reduxHook'
import { setUser } from '@/libs/redux-store/slices'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Divider, Surface } from 'react-native-paper'
import { useChangeProfileMutation } from '../hooks'
import { genderOptions } from '../options'
import { ChangeProfileSchema, ChangeProfileType } from '../types'

interface ChangeProfileFormProps {
	bottomSheetModalRef: React.RefObject<BottomSheetModal>
	onCloseModal: () => void
}

export const ChangeProfileForm = ({
	bottomSheetModalRef,
	onCloseModal,
}: ChangeProfileFormProps) => {
	const { user } = useAppSelector((state) => state.auth)
	const theme = useAppTheme()
	const snapPoints = useMemo(() => ['90%', '90%'], [])
	const { mutate } = useChangeProfileMutation()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ChangeProfileType>({
		defaultValues: {
			address: '',
			dateOfBirth: '',
			gender: '',
			name: '',
			phoneNumber: '',
		},
		values: {
			address: user?.address ?? '',
			dateOfBirth: user?.dateOfBirth ?? '',
			gender: user?.gender ?? '',
			name: user?.name ?? '',
			phoneNumber: user?.phoneNumber ?? '',
		},
		resolver: zodResolver(ChangeProfileSchema),
	})

	const onSubmit: SubmitHandler<ChangeProfileType> = (data) => {
		mutate(
			{
				...data,
				dateOfBirth: formatDate(data.dateOfBirth, 'yyyy-MM-dd'),
			},
			{
				onSuccess: () => {
					onCloseModal()
					dispatch(
						setUser({
							...user,
							...data,
						}),
					)
					Alert.alert(t('information.update_success'))
				},
				onError: () => {
					Alert.alert(t('information.update_error'))
				},
			},
		)
	}

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			snapPoints={snapPoints}
			handleIndicatorStyle={{ backgroundColor: colors.white, width: 40, opacity: 0.8 }}
			handleStyle={styles.handleModal}
			backgroundStyle={styles.modalBackground}
			handleComponent={() => (
				<LinearGradient
					colors={[colors.primary, colors.primaryDark]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.headerGradient}
				>
					<View style={styles.handleContainer}>
						<Pressable onPress={onCloseModal} style={styles.headerButton}>
							<MaterialCommunityIcons name="close" color={colors.white} size={18} />
							<Text style={styles.headerButtonText}>{t('information.cancel')}</Text>
						</Pressable>


						<Pressable onPress={handleSubmit(onSubmit)} style={styles.headerButton}>
							<MaterialCommunityIcons name="check" color={colors.white} size={18} />
							<Text style={styles.headerButtonText}>{t('information.save')}</Text>
						</Pressable>
					</View>
				</LinearGradient>
			)}
		>
			<Surface style={styles.formContainer}>
				<BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
					<KeyboardAvoidingView>
						<View style={styles.formContent}>
						<Controller
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									styleInput={textStyles.text14}
									placeholderTextColor={colors.placeholder}
									label={t('information.name')}
									theme={theme}
									value={value}
									onChangeText={onChange}
									error={!!errors?.name?.message}
									helperText={errors?.name?.message}
								/>
							)}
							name="name"
						/>

						<Controller
							control={control}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									label={t('information.birthday')}
									onChangeDate={onChange}
									value={value}
									placeholderTextColor={colors.placeholder}
									helperText={errors?.dateOfBirth?.message}
									styleInput={textStyles.text14}
									activeOutlineColor={colors.primary}
									datePickerProps={{
										maximumDate: new Date(),
									}}
								/>
							)}
							name="dateOfBirth"
						/>

						<Controller
							control={control}
							render={({ field: { onChange, value } }) => (
								<Select
									data={genderOptions}
									title={t('information.gender')}
									onChange={onChange}
									value={value}
									helperText={errors?.dateOfBirth?.message}
									styleInput={textStyles.text14}
								/>
							)}
							name="gender"
						/>

						<Controller
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									styleInput={textStyles.text14}
									placeholderTextColor={colors.placeholder}
									label={t('information.address')}
									theme={theme}
									value={value}
									onChangeText={onChange}
									error={!!errors?.address?.message}
									helperText={errors?.address?.message}
								/>
							)}
							name="address"
						/>

						<Controller
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									styleInput={textStyles.text14}
									placeholderTextColor={colors.placeholder}
									label={t('information.phone')}
									theme={theme}
									value={value}
									onChangeText={onChange}
									error={!!errors?.address?.message}
									helperText={errors?.address?.message}
									keyboardType="phone-pad"
								/>
							)}
							name="phoneNumber"
						/>
					</View>
					</KeyboardAvoidingView>
				</BottomSheetScrollView>
			</Surface>
		</BottomSheetModal>
	)
}

const styles = StyleSheet.create({
	// Modal Header Styles
	headerGradient: {
		width: '100%',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: 'hidden',
	},
	handleModal: {
		backgroundColor: 'transparent',
		borderTopEndRadius: 12,
		borderTopStartRadius: 12,
		borderBottomWidth: 0,
	},
	modalBackground: {
		backgroundColor: colors.backgroundElevated,
	},
	handleContainer: {
		height: 56,
		paddingVertical: 12,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	headerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	headerButtonText: {
		...textStyles.text14,
		color: colors.white,
	},
	headerTitle: {
		...textStyles.text16,
		color: colors.white,
		fontWeight: '600',
	},

	// Form Container Styles
	formContainer: {
		flex: 1,
		backgroundColor: colors.backgroundElevated,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	formContent: {
		gap: 20,
		paddingBottom: 100,
	},

	// Legacy Styles (kept for reference)
	scrollContainer: {
		paddingBottom: 200,
	},
	main: {
		paddingHorizontal: 20,
		marginTop: 20,
		gap: 20,
	},
	title: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginBottom: 16,
	},
})
