import {
	PlayPauseButton,
	SkipToNextButton,
	SkipToPreviousButton,
} from '@/libs/components/PlayerControl/PlayerControls'
import { useLastActiveTrack } from '@/libs/hooks/useLastActiveTrack'
import { usePlayerBackground } from '@/libs/hooks/usePlayerBackground'
import { NavigationProp } from '@/navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Surface } from 'react-native-paper'
import { useActiveTrack } from 'react-native-track-player'
import { colors } from '../config/theme'
import { defaultStyles, textStyles } from '../constants'
import { unknownTrackImageUri } from '../constants/images'
import { generateMediaUrl } from '../helpers/generateMediaUrl'
import { MovingText } from './MovingText'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const navigation = useNavigation<NavigationProp>()
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const displayedTrack = activeTrack ?? lastActiveTrack
	const handlePress = () => {
		navigation.navigate('PlayerStack', {
			screen: 'PLAYER',
			params: {
				id: displayedTrack?._id,
			},
		})
	}

	const image = generateMediaUrl(activeTrack?.artwork ?? unknownTrackImageUri, 'image')
	const { imageColors } = usePlayerBackground(image)

	if (!displayedTrack) return null

	return (
		<Surface style={[styles.container, style]}>
			<LinearGradient
				colors={[imageColors[0], colors.cardBackground]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={styles.gradient}
			>
				{/* Album Artwork */}
				<View style={styles.imageContainer}>
					<FastImage
						source={{
							uri: image,
							priority: FastImage.priority.normal
						}}
						style={styles.artworkImage}
					/>

					{activeTrack && (
						<View style={styles.playingIndicator}>
							<MaterialCommunityIcons 
								name="play-circle" 
								size={16} 
								color={colors.white} 
							/>
						</View>
					)}
				</View>

				{/* Track Info */}
				<TouchableOpacity 
					style={styles.trackTitleContainer}
					onPress={handlePress}
					activeOpacity={0.7}
				>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title ?? ''}
						animationThreshold={25}
					/>
					
					<View style={styles.artistRow}>
						<MaterialCommunityIcons 
							name="account" 
							size={12} 
							color={colors.textSecondary} 
							style={styles.artistIcon} 
						/>
						<Text style={styles.trackAuthor}>{displayedTrack.artist}</Text>
					</View>
				</TouchableOpacity>

				{/* Player Controls */}
				<View style={styles.trackControlsContainer}>
					<SkipToPreviousButton iconSize={22} />
					<PlayPauseButton
						iconSize={14}
						style={styles.playButton}
					/>
					<SkipToNextButton iconSize={22} />
				</View>
			</LinearGradient>
		</Surface>
	)
}

const styles = StyleSheet.create({
	// Container Styles
	container: {
		borderRadius: 16,
		overflow: 'hidden',
		elevation: 6,
		marginHorizontal: 16,
		marginBottom: Platform.OS === 'ios' ? 20 : 16,
	},
	gradient: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 12,
	},
	
	// Image Styles
	imageContainer: {
		position: 'relative',
		borderRadius: 12,
		overflow: 'hidden',
		marginRight: 12,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.1)',
	},
	artworkImage: {
		width: 48,
		height: 48,
		borderRadius: 8,
	},
	playingIndicator: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderTopLeftRadius: 8,
		paddingHorizontal: 4,
		paddingVertical: 2,
	},
	
	// Track Info Styles
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		justifyContent: 'center',
	},
	trackTitle: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '700',
		marginBottom: 2,
	},
	artistRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	artistIcon: {
		marginRight: 4,
	},
	trackAuthor: {
		...textStyles.text12,
		color: colors.textSecondary,
		fontWeight: '400',
	},
	
	// Controls Styles
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingLeft: 8,
	},
	playButton: { 
		width: 32, 
		height: 32,
		alignItems: 'center', 
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: 16,
	},
})
