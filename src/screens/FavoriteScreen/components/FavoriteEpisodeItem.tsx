import { colors } from '@/libs/config/theme'
import { defaultStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { EpisodeType } from '@/types/episode'
import { Entypo } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { useActiveTrack } from 'react-native-track-player'

interface FavoriteEpisodeItemProps {
	episode: EpisodeType & { favList?: boolean }
	onPress: () => void
	onShowModal: () => void
}

export const FavoriteEpisodeItem = ({
	episode,
	onPress,
	onShowModal,
}: FavoriteEpisodeItemProps) => {
	const activeTrack = useActiveTrack()
	const isActiveEpisode = activeTrack?._id === episode._id && activeTrack.favList === true

	return (
		<Pressable 
			onPress={onPress} 
			style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
		>
			<View style={styles.contentContainer}>
				{/* Artwork */}
				<FastImage
					source={{
						uri: episode.artwork
							? generateMediaUrl(episode.artwork, 'image')
							: unknownTrackImageUri,
					}}
					style={styles.artworkImage}
				/>

				{/* Episode Info */}
				<View style={styles.episodeNameContainer}>
					<View style={styles.titleContainer}>
						{isActiveEpisode && (
							<LoaderKit style={styles.playingIcon} name="LineScaleParty" color={colors.primary} />
						)}

						<Text
							numberOfLines={1}
							style={[styles.nameEpisode, isActiveEpisode && styles.activeEpisodeText]}
						>
							{episode.title}
						</Text>
					</View>
					<Text style={styles.trackAuthor}>{episode.chapterId?.bookId?.author}</Text>
				</View>

				{/* Action Button */}
				<Pressable 
					onPress={onShowModal} 
					style={({ pressed }) => [styles.actionModal, pressed && styles.actionModalPressed]}
				>
					<Entypo name="dots-three-horizontal" size={16} color={colors.textSecondary} />
				</Pressable>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 8,
		paddingHorizontal: 4,
		borderRadius: 12,
	},
	containerPressed: {
		backgroundColor: colors.backgroundElevated,
		opacity: 0.8,
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	artworkImage: {
		width: 50,
		height: 50,
		borderRadius: 8,
		elevation: 2,
	},
	episodeNameContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 12,
		gap: 4,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	nameEpisode: {
		...defaultStyles.text,
		fontSize: 16,
		fontWeight: '600',
		color: colors.text,
	},
	activeEpisodeText: {
		color: colors.primary,
	},
	trackAuthor: {
		...defaultStyles.text,
		fontSize: 12,
		color: colors.textSecondary,
	},
	actionModal: {
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionModalPressed: {
		backgroundColor: colors.backgroundElevated,
	},
	playingIcon: {
		width: 16,
		height: 16,
	},
})
