import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { ChapterType } from '@/types/chapter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'

type ChapterItemProps = {
	chapter: ChapterType
} & TouchableHighlightProps

export const ChapterItem = ({ chapter, ...props }: ChapterItemProps) => {
	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.7} {...props}>
			<View style={styles.playlistItemContainer}>
				{/* Chapter Image */}
				<View style={styles.imageWrapper}>
					<FastImage
						source={{
							uri: chapter.url ? generateMediaUrl(chapter.url, 'image') : '',
							priority: FastImage.priority.normal,
						}}
						style={styles.playlistArtworkImage}
					/>
				</View>

				{/* Chapter Content */}
				<View style={styles.contentContainer}>
					{/* Chapter Name */}
					<Text style={styles.chapterName} numberOfLines={1} ellipsizeMode="tail">
						{chapter.name}
					</Text>

					{/* Chapter Description */}
					{chapter.description && (
						<Text 
							style={styles.chapterDescription} 
							numberOfLines={1} 
							ellipsizeMode="tail"
						>
							{chapter.description}
						</Text>
					)}
				</View>

				{/* Chapter Navigation Icon */}
				<MaterialCommunityIcons 
					name="chevron-right" 
					size={24} 
					color={colors.primary} 
					style={styles.navigationIcon} 
				/>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
	},
	playlistItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	// Image Styles
	imageWrapper: {
		marginRight: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.border,
		overflow: 'hidden',
		elevation: 2,
	},
	playlistArtworkImage: {
		width: 56,
		height: 56,
		borderRadius: 8,
	},
	// Content Styles
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		gap: 4,
	},
	chapterName: {
		...textStyles.text16,
		color: colors.text,
		fontWeight: '600',
	},
	chapterDescription: {
		...textStyles.text12,
		color: colors.textSecondary,
		opacity: 0.9,
	},
	// Icon Styles
	navigationIcon: {
		marginLeft: 8,
		opacity: 0.8,
	},
})
