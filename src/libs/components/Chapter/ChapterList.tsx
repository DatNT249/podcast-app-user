import { colors } from '@/libs/config/theme'
import { textStyles, utilsStyles } from '@/libs/constants'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { ChapterListWithBookType, ChapterType } from '@/types/chapter'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { t } from 'i18next'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Surface } from 'react-native-paper'
import { EmptyData } from '../EmptyData'
import { ChapterItem } from './ChapterItem'

type ChapterListProps = {
	chapterData: ChapterListWithBookType | undefined
	onChapterPress: (playlist: ChapterType) => void
} & Partial<FlashListProps<ChapterType>>

const ItemDivider = () => <View style={{ ...utilsStyles.itemSeparator, marginVertical: 8, opacity: 0.1 }} />

export const ChapterList = ({
	chapterData,
	onChapterPress: handleChapterPress,
	...flatListProps
}: ChapterListProps) => {
	return (
		<FlashList
			contentContainerStyle={styles.contentContainer}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={<EmptyData title={t('chapter.not_found')} />}
			data={chapterData?.chapters}
			showsVerticalScrollIndicator={false}
			estimatedItemSize={100}
			scrollEnabled={true}
			ListHeaderComponent={
				<Surface style={styles.headerContainer}>
					<LinearGradient
						colors={[colors.primary, 'transparent']}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={styles.headerGradient}
					>
						{/* Book Cover */}
						<View style={styles.coverContainer}>
							<FastImage
								style={styles.image}
								source={{
									uri: chapterData?.book.url ? generateMediaUrl(chapterData?.book.url, 'image') : '',
									priority: FastImage.priority.high,
								}}
							/>
						</View>

						{/* Book Info */}
						<View style={styles.bookInfoContainer}>
							<Text style={styles.chapterName} numberOfLines={2} ellipsizeMode="tail">
								{chapterData?.book.name}
							</Text>

							<View style={styles.authorContainer}>
								<MaterialCommunityIcons 
									name="account" 
									size={16} 
									color={colors.textSecondary} 
									style={styles.authorIcon} 
								/>
								<Text style={styles.author}>{chapterData?.book.author}</Text>
							</View>

							{/* Chapter Count */}
							{chapterData?.chapters && (
								<View style={styles.chapterCountContainer}>
									<MaterialCommunityIcons 
										name="bookmark-outline" 
										size={16} 
										color={colors.primary} 
									/>
									<Text style={styles.chapterCountText}>
										{chapterData.chapters.length} {t('chapter.chapters')}
									</Text>
								</View>
							)}
						</View>
					</LinearGradient>
				</Surface>
			}
			renderItem={({ item: chapter }) => (
				<Surface style={styles.chapterItemContainer}>
					<ChapterItem chapter={chapter} onPress={() => handleChapterPress(chapter)} />
				</Surface>
			)}
			{...flatListProps}
		/>
	)
}

const styles = StyleSheet.create({
	// Container Styles
	contentContainer: { 
		paddingHorizontal: 16,
		paddingVertical: 12, 
		paddingBottom: 128,
		gap: 12,
		flexGrow: 1,
	},
	headerContainer: {
		borderRadius: 16,
		overflow: 'hidden',
		elevation: 3,
		backgroundColor: colors.cardBackground,
		marginBottom: 24,
	},
	headerGradient: {
		padding: 20,
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
	},
	chapterItemContainer: {
		backgroundColor: colors.cardBackground,
		borderRadius: 12,
		overflow: 'hidden',
		marginVertical: 4,
		elevation: 2,
	},
	
	// Book Cover Styles
	coverContainer: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		borderRadius: 12,
		elevation: 4,
	},
	image: { 
		width: 120, 
		height: 140, 
		borderRadius: 10,
		resizeMode: 'cover',
	},
	
	// Book Info Styles
	bookInfoContainer: {
		flex: 1,
		gap: 8,
		justifyContent: 'center',
	},
	chapterName: {
		...textStyles.text20,
		color: colors.text,
		fontWeight: '700',
		width: '90%',
	},
	authorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	authorIcon: {
		marginRight: 2,
	},
	author: { 
		...textStyles.text14,
		color: colors.textSecondary, 
		fontWeight: '500' 
	},
	
	// Chapter Count Styles
	chapterCountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: colors.cardBackground,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		alignSelf: 'flex-start',
		marginTop: 8,
	},
	chapterCountText: {
		...textStyles.text12,
		color: colors.primary,
		fontWeight: '500',
	},
})
