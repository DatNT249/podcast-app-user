import { Header, LinearGradientHeader, Loading } from '@/libs/components'
import { colors } from '@/libs/config/theme'
import { defaultStyles, screenPadding, textStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { NavigationProp } from '@/navigation'
import { HomeStackParams } from '@/navigation/BottomTabs/TabHome'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useTranslation } from 'react-i18next'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useGetDetailCategory } from '../hooks/useGetDetailCategory'
import { BookType } from '../types'

type RouteType = RouteProp<HomeStackParams, 'GENRE_DETAIL'>

export const GenreScreen = () => {
	const route = useRoute<RouteType>()
	const params = route.params
	const genreId = params?.id
	const navigation = useNavigation<NavigationProp>()
	const { data, isLoading } = useGetDetailCategory(genreId)
	const { t } = useTranslation()
	const redirectToChapter = (id: string) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: { screen: 'CHAPTER_HOME', params: { id } },
		})
	}

	const formatData = (data: BookType[] | undefined, numColumns: number): BookType[] => {
		if (!data) return []
		const formattedData = data.map((item) => ({ ...item, key: item?._id }))
		const numberOfFullRows = Math.floor(formattedData.length / numColumns)

		let numberOfElementsLastRow = formattedData.length - numberOfFullRows * numColumns
		while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
			formattedData.push({
				_id: `blank-${numberOfElementsLastRow}`,
				key: `blank-${numberOfElementsLastRow}`,
				name: '',
				url: '',
				author: '',
				description: '',
				isPremium: false,
			})
			numberOfElementsLastRow++
		}

		return formattedData
	}

	const numColumns = 3
	const formattedData = formatData(data?.books, numColumns)

	if (isLoading) return <Loading />

	return (
		<View style={defaultStyles.main}>
			<LinearGradientHeader />

			<Header title={data?.name ?? 'Thể loại'} showBack />

			<View
				style={{
					paddingHorizontal: screenPadding.horizontal,
					flex: 1,
					paddingTop: 20,
				}}
			>
				<FlashList
					data={formattedData}
					renderItem={({ item }) => {
						return (
							<Pressable
								style={{ position: 'relative', opacity: 0.8, marginBottom: 18 }}
								onPress={() => redirectToChapter(item?._id)}
							>
								<FastImage
									source={{
										uri: generateMediaUrl(item.url, 'image') ?? unknownTrackImageUri,
										priority: FastImage.priority.high,
									}}
									resizeMode="stretch"
									style={styles.image}
								/>

								<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
									{item.name}
								</Text>
							</Pressable>
						)
					}}
					numColumns={numColumns}
					keyExtractor={(item) => item?._id}
					estimatedItemSize={100}
					ListEmptyComponent={
						<Text style={{ color: colors.white, textAlign: 'center', marginTop: 20 }}>
							{t('common.no_data')}
						</Text>
					}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20,
	},
	image: {
		width: Dimensions.get('window').width / 3 - 20,
		height: 130,
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		maxWidth: 80,
		position: 'absolute',
		bottom: 2,
		left: 6,
		...textStyles.text12,
	},
})
