import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Surface } from 'react-native-paper'
import { useActiveTrack } from 'react-native-track-player'

interface CardProps {
	_id: string
	title: string
	description?: string
	onPress: () => void
	image: string
}

const Card: React.FC<CardProps> = ({ title, description, image, onPress, _id }) => {
	const isActiveTrack = useActiveTrack()?._id === _id

	const scaleValue = useRef(new Animated.Value(1)).current

	const onPressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start()
	}

	const onPressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: true,
		}).start()
	}

	return (
		<Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
			<Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
				<Surface style={styles.cardSurface}>
					{/* Image container with overlay gradient */}
					<View style={styles.imageContainer}>
						<FastImage
							source={{
								uri: generateMediaUrl(image, 'image') ?? unknownTrackImageUri,
								priority: FastImage.priority.high,
							}}
							resizeMode="cover"
							style={styles.image}
						/>
						
						{/* Title overlay */}
						<View style={styles.titleOverlay}>
							<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
								{title}
							</Text>
						</View>

						{/* Now playing indicator */}
						{isActiveTrack && (
							<View style={styles.playingIconContainer}>
								<LoaderKit style={styles.playingIcon} name="LineScaleParty" color={colors.primary} />
							</View>
						)}
					</View>

					{/* Description section */}
					{description && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
								{description}
							</Text>
						</View>
					)}
				</Surface>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 4,
	},
	cardSurface: {
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: colors.cardBackground,
		elevation: 3,
		width: 140,
	},
	imageContainer: {
		position: 'relative',
		overflow: 'hidden',
	},
	image: {
		width: 140,
		height: 150,
	},
	titleOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 8,
		paddingHorizontal: 10,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	title: {
		color: colors.white,
		fontWeight: '600',
		...textStyles.text14,
	},
	playingIconContainer: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 12,
		padding: 4,
	},
	playingIcon: {
		width: 24,
		height: 24,
	},
	descriptionContainer: {
		padding: 10,
	},
	description: {
		color: colors.textSecondary,
		...textStyles.text12,
		lineHeight: 16,
	},
})

export { Card }
