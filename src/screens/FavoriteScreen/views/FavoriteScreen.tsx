import { BaseHeader } from '@/libs/components/Header/BaseHeader'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { playEpisodes } from '@/libs/helpers/playEpisodes'
import { playSelectedEpisode } from '@/libs/helpers/playSelectedEpisode'
import { useQueue } from '@/libs/store/queue'
import { EpisodeType } from '@/types/episode'
import { FontAwesome6 } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TrackPlayer, { useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { FavoriteBottomModal, FavoriteEpisodeItem } from '../components'
import { useGetFavoriteEpisodes } from '../hooks'

export const FavoriteScreen = () => {
	const { top } = useSafeAreaInsets()
	const { data } = useGetFavoriteEpisodes()
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()
	const { playing } = useIsPlaying()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [episode, setEpisode] = useState<EpisodeType | undefined>(undefined)
	const { t } = useTranslation()
	const handleOpenBottomSheet = (episode: EpisodeType) => {
		setEpisode(episode)
		bottomSheetRef.current?.present()
	}

	const handleCloseBottomSheet = () => {
		bottomSheetRef.current?.dismiss()
		setEpisode(undefined)
	}

	const mapDataFavorite = data?.favorites.map((episode, index) => {
		return {
			...episode,
			id: index + 1,
			favList: true,
		}
	})

	const activeTrack = useActiveTrack()
	const isActiveFav = mapDataFavorite?.some(
		(fav) => fav._id === activeTrack?._id && activeTrack?.favList === true,
	)

	const onPlay = async () => {
		if (isActiveFav) {
			if (playing) {
				await TrackPlayer.pause()
			} else {
				await TrackPlayer.play()
			}
		} else {
			playEpisodes(mapDataFavorite)
		}
	}

	const isFavPlaying = activeTrack?.favList === true && playing

	return (
		<SafeAreaView style={[defaultStyles.main, { paddingTop: top }]}>
			{/* Modern Header with Gradient */}
			<View style={styles.headerContainer}>
				<LinearGradient
					colors={[colors.primary, colors.backgroundElevated]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					style={styles.headerGradient}
				>
					<View style={styles.headerContent}>
						<View style={styles.headerLeft}>
							<BaseHeader showBack={true} />
						</View>
						
						<View style={styles.headerCenter}>
							<Text style={styles.headerTitle}>{t('favorite.title')}</Text>
						</View>
						
						<View style={styles.headerRight}>
							<Pressable style={styles.playAllButton} onPress={onPlay}>
								<FontAwesome6 name={isFavPlaying ? 'pause' : 'play'} size={18} color={colors.text} />
							</Pressable>
						</View>
					</View>
				</LinearGradient>
			</View>

			{/* Favorites List */}
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
				<View style={styles.infoContainer}>
					<Text style={styles.infoText}>
						{data?.favorites.length ?? 0} {t('favorite.episode')}
					</Text>
				</View>

				{data?.favorites.length === 0 ? (
					<View style={styles.emptyContainer}>
						<FontAwesome6 name="heart" size={48} color={colors.greyInactive} style={styles.emptyIcon} />
						<Text style={styles.emptyText}>{t('favorite.empty')}</Text>
					</View>
				) : (
					<View style={styles.episodesContainer}>
						{mapDataFavorite?.map((episode) => (
							<FavoriteEpisodeItem
								key={episode._id}
								episode={episode}
								onPress={() =>
									playSelectedEpisode(
										episode,
										mapDataFavorite,
										activeQueueId,
										queueOffset,
										setActiveQueueId,
									)
								}
								onShowModal={() => handleOpenBottomSheet(episode)}
							/>
						))}
					</View>
				)}
			</ScrollView>

			<FavoriteBottomModal
				episode={episode}
				bottomSheetRef={bottomSheetRef}
				onClose={handleCloseBottomSheet}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	// Header Styles
	headerContainer: {
		width: '100%',
		paddingTop: 0,
		zIndex: 10,
	},
	headerGradient: {
		width: '100%',
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 8,
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	headerLeft: {
		flex: 1,
		alignItems: 'flex-start',
	},
	headerCenter: {
		flex: 2,
		alignItems: 'center',
	},
	headerRight: {
		flex: 1,
		alignItems: 'flex-end',
	},
	headerTitle: {
		...textStyles.text18,
		fontWeight: 'bold',
		color: colors.text,
		textAlign: 'center',
	},
	playAllButton: {
		backgroundColor: colors.primary,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 4,
	},

	// Content Styles
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 120, // Space for floating player
	},
	infoContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	infoText: {
		...textStyles.text14,
		color: colors.textSecondary,
		fontWeight: '500',
	},
	episodesContainer: {
		padding: 16,
		gap: 16,
	},
	
	// Empty state
	emptyContainer: {
		flex: 1,
		minHeight: 300,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	emptyIcon: {
		marginBottom: 16,
		opacity: 0.5,
	},
	emptyText: {
		...textStyles.text16,
		color: colors.textSecondary,
		textAlign: 'center',
	},
})
