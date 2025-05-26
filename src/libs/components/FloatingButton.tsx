import { colors } from '@/libs/config/theme'
import { AIBoxSchema, AIBoxType } from '@/types/ai'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'moti'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	PanResponder,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import { Surface } from 'react-native-paper'
import { postAIPrompt } from '../api/ai'
import { textStyles } from '../constants'
import { Button } from './Button'
import { Input } from './Input'
import { Modal } from './Modal'

const FloatingButton = () => {
	const [open, setOpen] = useState(false)
	const pan = useRef(
		new Animated.ValueXY({
			x: 0,
			y: Dimensions.get('screen').height / 2 - 30,
		}),
	).current
	const gestureStart = useRef({ x: 0, y: Dimensions.get('screen').height / 2 })
	const tapThreshold = 5
	const { t } = useTranslation()

	const { mutate, isPending, data } = useMutation({
		mutationFn: postAIPrompt,
	})

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AIBoxType>({
		defaultValues: {
			prompt: '',
		},
		resolver: zodResolver(AIBoxSchema),
	})

	const onSubmit = (data: AIBoxType) => {
		mutate(data)
	}

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: (evt, gestureState) => {
				gestureStart.current = { x: gestureState.x0, y: gestureState.y0 }
				pan.setOffset({
					x: (pan.x as any)._value,
					y: (pan.y as any)._value,
				})
				pan.setValue({ x: 0, y: Dimensions.get('screen').height / 2 })
			},
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: (evt, gestureState) => {
				if (Math.abs(gestureState.dx) < tapThreshold && Math.abs(gestureState.dy) < tapThreshold) {
					setOpen(true)
				}
				pan.flattenOffset()
				console.log("SS")
			},
		}),
	).current

	useEffect(() => {
		reset()
	}, [open])

	return (
		<Fragment>
			<Modal
				title={t('ai_prompt.title') || 'AI đặt câu hỏi'}
				isVisible={open}
				onCloseModal={() => setOpen(false)}
				content={
					<View style={styles.modalContent}>
						{/* Header with AI icon and title */}
						<View style={styles.modalHeader}>
							<MaterialCommunityIcons name="chat-question" size={28} color={colors.primary} />
							<Text style={styles.modalHeaderText}>
								{t('ai_prompt.subtitle') || 'Hỏi trợ lý AI'}
							</Text>
						</View>

						{/* Result Box */}
						<Surface style={styles.resultBox} elevation={2}>
							{isPending ? (
								<View style={styles.loadingContainer}>
									<ActivityIndicator size="small" color={colors.primary} />
									<Text style={styles.loadingText}>
										{t('ai_prompt.processing') || 'Đang xử lý...'}
									</Text>
								</View>
							) : (
								<ScrollView
									showsHorizontalScrollIndicator={false}
									style={{
										maxHeight: 120,
									}}
								>
									<Text style={styles.resultText}>
										{data?.result ? data.result : t('ai_prompt.no_data') || 'Không có dữ liệu'}
									</Text>
								</ScrollView>
							)}
						</Surface>

						{/* Input Section */}
						<View style={styles.inputSection}>
							<Text style={styles.inputLabel}>
								{t('ai_prompt.your_question') || 'Câu hỏi của bạn'}
							</Text>
							<Controller
								control={control}
								name="prompt"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder={t('ai_prompt.placeholder') || 'Điền thông tin cần tìm'}
										value={value}
										onChangeText={onChange}
										error={!!errors?.prompt?.message}
										helperText={errors?.prompt?.message}
										leftIcon={
											<MaterialCommunityIcons
												name="comment-question"
												size={20}
												color={colors.primary}
											/>
										}
										multiline
										styleInput={styles.inputText}
										containerStyle={styles.inputContainer}
									/>
								)}
							/>
						</View>

						{/* Button Section */}
						<View style={styles.buttonContainer}>
							<Button
								title={t('ai_prompt.submit') || 'Gửi câu hỏi'}
								onPress={handleSubmit(onSubmit)}
								mode="contained"
								size="large"
								loading={isPending}
								fullWidth
								icon={<MaterialCommunityIcons name="send" size={20} color={colors.white} />}
								iconPosition="right"
							/>
						</View>
					</View>
				}
			/>

			{/* Floating Action Button */}
			<Animated.View style={[styles.floatingIcon, pan.getLayout()]} {...panResponder.panHandlers} >
				<LinearGradient
					colors={[colors.borderColor, colors.primaryDark]}
					style={styles.floatingGradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				/>
				<TouchableOpacity onPress={() => setOpen(true)}>

				<MaterialCommunityIcons name="chat-question" size={28} color={colors.white} />
				</TouchableOpacity>
			</Animated.View>
		</Fragment>
	)
}

const styles = StyleSheet.create({
	// Floating Button Styles
	floatingIcon: {
		position: 'absolute',
		width: 56,
		height: 56,
		borderRadius: 28,
		bottom: 24,
		right: 24,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		overflow: 'hidden',
	},
	floatingGradient: {
		...StyleSheet.absoluteFillObject,
	},

	// Modal Content Styles
	modalContent: {
		minHeight: 400,
		padding: 16,
		backgroundColor: colors.backgroundElevated,
	},
	modalHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		gap: 12,
	},
	modalHeaderText: {
		...textStyles.text18,
		color: colors.text,
		fontWeight: '600',
	},

	// Result Box Styles
	resultBox: {
		backgroundColor: colors.cardBackground,
		borderRadius: 12,
		padding: 16,
		minHeight: 120,
		marginBottom: 24,
		overflow: 'hidden',
	},
	resultText: {
		...textStyles.text16,
		color: colors.text,
		lineHeight: 22,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
	loadingText: {
		...textStyles.text14,
		color: colors.textSecondary,
	},

	// Input Section Styles
	inputSection: {
		marginBottom: 20,
	},
	inputLabel: {
		...textStyles.text14,
		color: colors.textSecondary,
		marginBottom: 8,
		marginLeft: 4,
	},
	inputContainer: {
		marginBottom: 0,
	},
	inputText: {
		...textStyles.text16,
		color: colors.text,
		height: 80,
		textAlignVertical: 'top',
		paddingTop: 12,
	},

	// Button Section Styles
	buttonContainer: {
		width: '100%',
		marginTop: 8,
	},
})

export { FloatingButton }
