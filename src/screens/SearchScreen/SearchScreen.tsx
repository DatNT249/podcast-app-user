import { colors } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { NavigationProp } from '@/navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TextInput } from 'react-native-gesture-handler'
import { Surface } from 'react-native-paper'
import { BookType, HeaderBookScreen } from '../BookScreen'
import { useQuerySearch } from './hooks'

const SearchScreen = () => {
	const [search, setSearch] = useState('')
	const onChangeSearch = (text: string) => setSearch(text)
	const navigation = useNavigation<NavigationProp>()
	const { data, isLoading } = useQuerySearch(search)
	const { t } = useTranslation()

	const redirectToChapter = (id: string) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: { screen: 'CHAPTER_HOME', params: { id } },
		})
	}

	const formatData = (data: BookType[] | undefined, numColumns: number): BookType[] => {
		if (!data) return []
		const formattedData = data.map((item) => ({ ...item, key: item._id }))
		const numberOfFullRows = Math.floor(formattedData.length / numColumns)

		let numberOfElementsLastRow = formattedData.length - numberOfFullRows * numColumns
		while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
			formattedData.push({
				_id: `blank-${numberOfElementsLastRow}`,
				key: `blank-${numberOfElementsLastRow}`,
				name: '',
				url: '',
				description: '',
				isPremium: false,
				author: '',
			})
			numberOfElementsLastRow++
		}

		return formattedData
	}

	const numColumns = 3
	const formattedData = formatData(data, numColumns)

	return (
		<SafeAreaView style={defaultStyles.main}>
			<HeaderBookScreen />

			<View style={styles.searchContainer}>
				<Surface style={styles.search}>
					<MaterialCommunityIcons name="magnify" size={24} color={colors.textSecondary} style={styles.icon} />
					<TextInput
						style={styles.input}
						placeholder={t('search.placeholder')}
						placeholderTextColor={colors.textSecondary}
						value={search}
						onChangeText={onChangeSearch}
						selectionColor={colors.primary}
					/>
					{search.length > 0 && (
						<Pressable onPress={() => setSearch('')} style={styles.clearButton}>
							<MaterialCommunityIcons name="close-circle" size={18} color={colors.textSecondary} />
						</Pressable>
					)}
				</Surface>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<Text style={styles.loadingText}>{t('search.searching') || 'Đang tìm kiếm...'}</Text>
				</View>
			) : (
				<FlashList
					data={formattedData}
					contentContainerStyle={{
						padding: 16,
						paddingTop: 8,
					}}
					renderItem={({ item }) => {
						// Don't render blank items
						if (item._id.includes('blank-')) {
							return <View style={styles.emptyItem} />;
						}
						return (
							<Pressable
								style={styles.bookItem}
								onPress={() => redirectToChapter(item._id)}
							>
								<Surface style={styles.imageContainer}>
									<FastImage
										source={{
											uri: generateMediaUrl(item.url, 'image') ?? unknownTrackImageUri,
											priority: FastImage.priority.high,
										}}
										resizeMode="cover"
										style={styles.image}
									/>
									<View style={styles.titleContainer}>
										<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
											{item.name}
										</Text>
									</View>
								</Surface>
							</Pressable>
						)
					}}
					numColumns={numColumns}
					keyExtractor={(item) => item._id}
					estimatedItemSize={160}
					ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
					ListEmptyComponent={
						<View style={styles.emptyListContainer}>
							<MaterialCommunityIcons name="book-search" size={64} color={colors.textSecondary} />
							<Text style={styles.emptyListText}>
								{search.length > 0 ? t('search.not_found') : t('search.empty')}
							</Text>
						</View>
					}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	// Search styles
	searchContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.backgroundElevated,
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 4,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	input: {
		flex: 1,
		height: 48,
		paddingHorizontal: 8,
		...textStyles.text14,
		color: colors.text,
	},
	icon: {
		marginRight: 4,
	},
	clearButton: {
		padding: 6,
	},

	// Loading state styles
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 40,
	},
	loadingText: {
		...textStyles.text14,
		color: colors.textSecondary,
		marginTop: 16,
	},

	// Book item styles
	bookItem: {
		margin: 6,
		borderRadius: 12,
		overflow: 'hidden',
	},
	imageContainer: {
		borderRadius: 12,
		overflow: 'hidden',
		elevation: 3,
		backgroundColor: colors.cardBackground,
	},
	image: {
		width: Dimensions.get('window').width / 3 - 20,
		height: 150,
		borderRadius: 12,
	},
	titleContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.6)',
		paddingVertical: 6,
		paddingHorizontal: 8,
	},
	title: {
		color: colors.white,
		fontWeight: '600',
		...textStyles.text12,
	},
	emptyItem: {
		margin: 6,
		width: Dimensions.get('window').width / 3 - 20,
		height: 150,
	},

	// Empty list styles
	emptyListContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 60,
		paddingHorizontal: 32,
	},
	emptyListText: {
		...textStyles.text16,
		color: colors.textSecondary,
		textAlign: 'center',
		marginTop: 16,
		lineHeight: 22,
	},
})

export { SearchScreen }
