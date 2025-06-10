import { defaultStyles } from '@/libs/constants'
import { playSelectedEpisode } from '@/libs/helpers/playSelectedEpisode'
import { useQueue } from '@/libs/store/queue'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, HeaderBookScreen, ListItem } from '../components'
import { useGetBooks, useGetCategories, useGetTop10Episodes } from '../hooks'

export const BookScreen = () => {
	const { t } = useTranslation()

	const { data: books, isLoading: booksLoading } = useGetBooks()
	const { data: top10Episodes, isLoading: top10EpisodesLoading } = useGetTop10Episodes()
	const { data: genres, isLoading: genresLoading } = useGetCategories()
	const { activeQueueId, setActiveQueueId } = useQueue()
	const queueOffset = useRef(0)
	const navigation = useNavigation<NavigationProp>()

	const styles = StyleSheet.create({
		scrollContent: {
			flexGrow: 1,
			paddingBottom: 16,
		},
		bottomSpace: {
			height: 120,
		},
	})

	const navigateToChapter = (id: string) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: {
				screen: 'CHAPTER_HOME',
				params: { id },
			},
		})
	}

	const navigateToGenreScreen = (id: string) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: {
				screen: 'GENRE_DETAIL',
				params: { id },
			},
		})
	}

	return (
		<SafeAreaView style={defaultStyles.main}>
			<HeaderBookScreen />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* New Books Section */}
				<ListItem
					data={books}
					renderItem={({ item }) => (
						<Card
							_id={item._id}
							onPress={() => navigateToChapter(item._id)}
							title={item.name}
							description={item.description}
							image={item.url}
							key={item._id}
						/>
					)}
					title={t('home.new_book')}
					isLoading={booksLoading}
					showViewAll={true}
					onViewAllPress={() => console.log('View all new books')}
				/>

				{/* Top 10 Episodes Section */}
				<ListItem
					data={top10Episodes}
					renderItem={({ item }) => (
						<Card
							onPress={() => {
								playSelectedEpisode(
									item,
									top10Episodes ?? [],
									activeQueueId,
									queueOffset,
									setActiveQueueId,
								)
							}}
							title={item.title}
							description={item.description}
							image={item.artwork}
							_id={item._id}
							key={item._id}
						/>
					)}
					title={t('home.top_10')}
					isLoading={top10EpisodesLoading}
					showViewAll={true}
					onViewAllPress={() => console.log('View all top 10')}
				/>

				{/* Genres Section */}
				<ListItem
					data={genres}
					renderItem={({ item }) => (
						<Card
							_id={item.id}
							onPress={() => navigateToGenreScreen(item.id)}
							title={item.name}
							image={item.url}
							key={item.id}
						/>
					)}
					title={t('home.genre')}
					isLoading={genresLoading}
					showViewAll={true}
					onViewAllPress={() => console.log('View all genres')}
				/>

				{/* Bottom space for player */}
				<View style={styles.bottomSpace} />
			</ScrollView>
		</SafeAreaView>
	)
}
