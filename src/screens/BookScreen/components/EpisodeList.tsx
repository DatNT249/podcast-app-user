import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { EpisodeWithChapterAndBookType } from '@/types/episode'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Surface } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { EpisodeListControl } from './EpisodeListControl'

interface EpisodeListProps {
	data: EpisodeWithChapterAndBookType
}

export const EpisodeList = ({ data: { book, chapter, episodes } }: EpisodeListProps) => {
	const { t } = useTranslation()
	return (
		<EpisodeListControl
			id={chapter._id}
			scrollEnabled={false}
			ListHeaderComponentStyle={styles.playlistHeaderContainer}
			ListHeaderComponent={
				<Surface style={styles.headerSurface}>
					<LinearGradient
						colors={[colors.primary, 'transparent']}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={styles.headerGradient}
					>
						{/* Chapter Title */}
						<Text numberOfLines={1} style={styles.playlistNameText}>
							{chapter.name}
						</Text>

						{/* Book Info Container */}
						<View style={styles.artworkImageContainer}>
							<FastImage
								source={{
									uri: chapter.url ? generateMediaUrl(chapter.url, 'image') : '',
									priority: FastImage.priority.high,
								}}
								style={styles.artworkImage}
							/>

							<View style={styles.bookInfoContainer}>
								<MaterialCommunityIcons 
									name="book-open-variant" 
									size={16} 
									color={colors.textSecondary} 
									style={styles.bookIcon} 
								/>
								<Text style={styles.bookNameText}>{book.name}</Text>
							</View>
						</View>

						{/* Episode Count */}
						<View style={styles.episodeCountContainer}>
							<MaterialCommunityIcons 
								name="headphones" 
								size={16} 
								color={colors.primary} 
							/>
							<Text style={styles.episodeCountText}>
								{episodes.length} {t('common.episodes')}
							</Text>
						</View>
					</LinearGradient>
				</Surface>
			}
			episodes={episodes}
		/>
	)
}

const styles = StyleSheet.create({
	// Container Styles
	playlistHeaderContainer: {
		marginBottom: 24,
	},
	headerSurface: {
		borderRadius: 16,
		overflow: 'hidden',
		elevation: 3,
		backgroundColor: colors.cardBackground,
		marginHorizontal: 16,
		marginTop: 8,
	},
	headerGradient: {
		padding: 20,
	},

	// Chapter Title Styles
	playlistNameText: {
		...textStyles.text20,
		fontWeight: '700',
		color: colors.text,
		marginBottom: 16,
	},

	// Artwork and Book Info Styles
	artworkImageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginBottom: 16,
	},
	artworkImage: {
		width: 50,
		height: 50,
		resizeMode: 'cover',
		borderRadius: 8,
		elevation: 2,
	},
	bookInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	bookIcon: {
		marginRight: 2,
	},
	bookNameText: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '500',
	},

	// Episode Count Styles
	episodeCountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: colors.cardBackground,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		alignSelf: 'flex-start',
	},
	episodeCountText: {
		...textStyles.text12,
		color: colors.primary,
		fontWeight: '500',
	},
})
