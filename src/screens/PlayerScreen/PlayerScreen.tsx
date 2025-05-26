import { Loading } from '@/libs/components'
import { MovingText } from '@/libs/components/MovingText'
import { PlayerControls } from '@/libs/components/PlayerControl/PlayerControls'
import { PlayerProgressBar } from '@/libs/components/PlayerControl/PlayerProgressbar'
import { colors } from '@/libs/config/theme'
import { defaultStyles, device, screenPadding, textStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { usePlayerBackground } from '@/libs/hooks'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { Animated, Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Surface } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { AboutThisEpisode } from './components'
import { FavoriteButton } from './components/FavoriteButton'
import { HeaderPlayer } from './components/HeaderPlayer'
import { useGetDetailEpisode } from './hooks' 

const PlayerScreen = () => {
	const activeTrack = useActiveTrack()
	const episodeId = activeTrack?._id
	const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)
	const { top, bottom } = useSafeAreaInsets()
	const { data: episodeDetail } = useGetDetailEpisode(episodeId)
	const { t } = useTranslation()

	if (!activeTrack) {
		return <Loading />
	}

	return (
		<LinearGradient 
			style={styles.container} 
			colors={[imageColors[0], colors.backgroundElevated]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
		>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView 
					style={styles.overlayContainer}
					showsVerticalScrollIndicator={false}
				>
					<HeaderPlayer title={episodeDetail?.title} />
					
					{/* Album Artwork Section */}
					<View style={styles.contentContainer}>
						<Surface style={styles.episodeBackground}>
							<FastImage
								source={{
									uri: activeTrack.artwork
										? generateMediaUrl(activeTrack.artwork, 'image')
										: unknownTrackImageUri,
									priority: FastImage.priority.high,
								}}
								resizeMode="cover"
								style={styles.artworkImage}
							/>

							

							<View style={styles.artworkOverlay}>
								<MaterialCommunityIcons 
									name="headphones" 
									size={28} 
									color={colors.white} 
									style={styles.overlayIcon}
								/>
							</View>
						</Surface>

						{/* Track Info & Controls Section */}
						<Surface style={styles.playerInfoContainer}>
							{/* Track Title & Artist */}
							<View style={styles.trackInfoSection}>
								<View style={styles.titleRow}>
									<View style={styles.nameEpisode}>
										<MovingText
											text={activeTrack.title ?? ''}
											animationThreshold={30}
											style={styles.episode}
										/>
									</View>

									<FavoriteButton episodeDetail={episodeDetail} />
								</View>

								{activeTrack.artist && (
									<View style={styles.artistRow}>
										<MaterialCommunityIcons 
											name="book-open-variant" 
											size={16} 
											color={colors.textSecondary} 
											style={styles.artistIcon} 
										/>
										<Text numberOfLines={1} style={styles.trackArtist}>
											{activeTrack.artist}
										</Text>
									</View>
								)}
							</View>

							{/* Progress Bar */}
							<View style={styles.progressBarContainer}>
								<PlayerProgressBar />
							</View>

							{/* Playback Controls */}
							<View style={styles.controlsContainer}>
								<PlayerControls />
							</View>
						</Surface>
					</View>

					{/* Episode & Book Information */}
					<View style={styles.infoCardsContainer}>
						<Surface style={styles.infoCard}>
							<AboutThisEpisode
								title={t('player.info_episode')}
								description={episodeDetail?.description || ''}
							/>
						</Surface>

						<Surface style={styles.infoCard}>
							<AboutThisEpisode
								title={t('player.info_book')}
								description={episodeDetail?.chapterId?.bookId?.description || 'Chưa cập nhật'}
							/>
						</Surface>
					</View>

					<View style={styles.bottomPadding} />
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	// Main Container Styles
	container: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
	contentContainer: {
		paddingTop: 12,
		gap: 16,
	},

	// Artwork Section Styles
	episodeBackground: {
		overflow: 'hidden',
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderRadius: 24,
		elevation: 8,
		height: Dimensions.get('screen').height / 2.2,
		width: '100%',
		position: 'relative',
		shadowColor: colors.primary,
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.5,
		shadowRadius: 12.0,
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	blurOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
	artworkOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.1)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	overlayIcon: {
		opacity: 0.8,
	},

	// Player Info Styles
	playerInfoContainer: {
		backgroundColor: colors.cardBackground,
		borderRadius: 20,
		padding: 20,
		elevation: 4,
	},
	trackInfoSection: {
		marginBottom: 16,
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	nameEpisode: {
		flex: 1,
		overflow: 'hidden',
	},
	episode: {
		...textStyles.text20,
		color: colors.text,
		fontWeight: '700',
	},
	artistRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	artistIcon: {
		marginRight: 6,
	},
	trackArtist: {
		...textStyles.text14,
		color: colors.textSecondary,
		flex: 1,
	},
	progressBarContainer: {
		marginVertical: 8,
	},
	controlsContainer: {
		marginTop: 8,
	},

	// Info Cards Styles
	infoCardsContainer: {
		marginTop: 24,
		gap: 16,
	},
	infoCard: {
		backgroundColor: colors.cardBackground,
		borderRadius: 16,
		padding: 16,
		elevation: 2,
	},
	bottomPadding: {
		height: 80,
	},
})

export { PlayerScreen }
