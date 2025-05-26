import { Header, LinearGradientHeader, Loading } from '@/libs/components'
import { ChapterList } from '@/libs/components/Chapter/ChapterList'
import { colors } from '@/libs/config/theme'
import { defaultStyles, screenPadding } from '@/libs/constants'
import { NavigationProp } from '@/navigation'
import { HomeStackParams } from '@/navigation/BottomTabs/TabHome'
import { ChapterType } from '@/types/chapter'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useGetChapters } from '../hooks'

type RouteType = RouteProp<HomeStackParams, 'CHAPTER_HOME'>

const ChapterScreen = () => {
	const route = useRoute<RouteType>()
	const params = route.params
	const bookId = params?.id
	const navigation = useNavigation<NavigationProp>()
	const { data, isLoading, refetch, isRefetching } = useGetChapters(String(bookId))

	const navigateToEpisodeScreen = (chapter: ChapterType) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: {
				screen: 'EPISODE_HOME',
				params: {
					id: chapter._id,
				},
			},
		})
	}

	if (isLoading) return <Loading />

	return (
		<View style={defaultStyles.main}>
			<LinearGradientHeader />

			<Header title={data?.book.name} showBack />

			<View
				style={{
					paddingHorizontal: screenPadding.horizontal,
					flex: 1,
					height: '100%'
				}}
			>
				<ChapterList
					scrollEnabled={true}
					chapterData={data}
					onChapterPress={navigateToEpisodeScreen}
					estimatedItemSize={200}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
							tintColor={colors.text}
							onRefresh={() => {
								refetch()
							}}
						/>
					}
				/>
			</View>
		</View>
	)
}

export { ChapterScreen }
