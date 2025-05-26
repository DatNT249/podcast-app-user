import { Avatar, LinearGradientHeader } from '@/libs/components'
import { Button } from '@/libs/components/Button'
import { BaseHeader, Header } from '@/libs/components/Header'
import { colors } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { formatDate } from '@/libs/helpers/format'
import { useAppSelector } from '@/libs/redux-store/reduxHook'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Divider, Surface } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChangeProfileForm } from '../components/ChangeProfileForm'
import { genderOptions } from '../options'

export const ChangeProfileScreen = () => {
	const { user } = useAppSelector((state) => state.auth)
	const { t } = useTranslation()
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const onShowModal = () => {
		bottomSheetModalRef.current?.present()
	}

	const onCloseModal = () => {
		bottomSheetModalRef.current?.dismiss()
	}

	return (
		<SafeAreaView style={defaultStyles.main}>
			{/* Header Section */}
			<LinearGradient
				colors={[colors.primary, colors.primaryDark]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={styles.headerGradient}
			>
				<Header title={t('information.update_info')} showBack={true} />
			</LinearGradient>

			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{/* Profile Card */}
				<Surface style={styles.profileCard}>
					<View style={styles.avatarContainer}>
						<Avatar size={90} textSize={36} />
						<View style={styles.nameContainer}>
							<Text style={styles.nameText}>{user?.name}</Text>
							<Text style={styles.emailText}>{user?.email}</Text>
						</View>
					</View>
				</Surface>

				{/* Information Card */}
				<Surface style={styles.infoCard}>
					<View style={styles.cardHeader}>
						<MaterialCommunityIcons name="information-outline" size={20} color={colors.primary} />
						<Text style={styles.cardTitle}>{t('information.title')}</Text>
					</View>

					<Divider style={styles.divider} />

					<View style={styles.infoList}>
						<View style={styles.infoItem}>
							<MaterialCommunityIcons name="map-marker" size={18} color={colors.textSecondary} />
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoLabel}>{t('information.address')}</Text>
								<Text style={styles.infoValue}>{user?.address || 'Chưa cập nhật'}</Text>
							</View>
						</View>

						<View style={styles.infoItem}>
							<MaterialCommunityIcons name="gender-male-female" size={18} color={colors.textSecondary} />
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoLabel}>{t('information.gender')}</Text>
								<Text style={styles.infoValue}>
									{genderOptions.find((item) => item.value === user?.gender)?.label || 'Chưa cập nhật'}
								</Text>
							</View>
						</View>

						<View style={styles.infoItem}>
							<MaterialCommunityIcons name="phone" size={18} color={colors.textSecondary} />
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoLabel}>{t('information.phone')}</Text>
								<Text style={styles.infoValue}>{user?.phoneNumber || 'Chưa cập nhật'}</Text>
							</View>
						</View>

						<View style={styles.infoItem}>
							<MaterialCommunityIcons name="calendar" size={18} color={colors.textSecondary} />
							<View style={styles.infoTextContainer}>
								<Text style={styles.infoLabel}>{t('information.birthday')}</Text>
								<Text style={styles.infoValue}>
									{user?.dateOfBirth ? formatDate(user?.dateOfBirth, 'dd/MM/yyyy') : 'Chưa cập nhật'}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.updateButtonContainer}>
						<Button
							title={t('information.update')}
							onPress={onShowModal}
							mode="contained"
							size="medium"
							icon={<MaterialCommunityIcons name="pencil" size={18} color={colors.white} />}
						/>
					</View>
				</Surface>
			</ScrollView>

			<ChangeProfileForm bottomSheetModalRef={bottomSheetModalRef} onCloseModal={onCloseModal} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	// Header Styles
	headerGradient: {
		width: '100%',
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		paddingBottom: 8,
	},

	// Container Styles
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 120,
		paddingHorizontal: 16,
		paddingTop: 16,
		gap: 16,
	},

	// Profile Card Styles
	profileCard: {
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: colors.cardBackground,
		elevation: 3,
		marginBottom: 16,
		padding: 16,
	},
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	nameContainer: {
		flex: 1,
	},
	nameText: {
		...textStyles.text18,
		color: colors.text,
		fontWeight: '600',
		marginBottom: 4,
	},
	emailText: {
		...textStyles.text14,
		color: colors.textSecondary,
	},

	// Info Card Styles
	infoCard: {
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: colors.cardBackground,
		elevation: 3,
		padding: 16,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 12,
	},
	cardTitle: {
		...textStyles.text16,
		fontWeight: '600',
		color: colors.text,
	},
	divider: {
		backgroundColor: colors.border,
		opacity: 0.2,
		marginBottom: 16,
	},
	infoList: {
		gap: 16,
	},
	infoItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	infoTextContainer: {
		flex: 1,
	},
	infoLabel: {
		...textStyles.text14,
		color: colors.textSecondary,
		marginBottom: 2,
	},
	infoValue: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '500',
	},
	updateButtonContainer: {
		marginTop: 24,
		alignItems: 'center',
	},

	// Modal Styles
	handleModal: {
		backgroundColor: colors.backgroundElevated,
		borderTopEndRadius: 12,
		borderTopStartRadius: 12,
		borderBottomWidth: 0,
	},
	title: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: colors.border,
		marginBottom: 16,
	},
})
