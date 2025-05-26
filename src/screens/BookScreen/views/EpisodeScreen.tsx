import { LinearGradientHeader } from '@/libs/components'
import { Header } from '@/libs/components/Header'
import { Loading } from '@/libs/components/Loading'
import { colors } from '@/libs/config/theme'
import { defaultStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { usePlayerBackground } from '@/libs/hooks'
import { HomeStackParams } from '@/navigation/BottomTabs/TabHome'
import { EpisodeWithChapterAndBookType } from '@/types/episode'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { EpisodeList } from '../components'
import { useGetEpisodes } from '../hooks'

type RouteType = RouteProp<HomeStackParams, 'EPISODE_HOME'>

const EpisodeScreen = () => {
	const route = useRoute<RouteType>()
	const params = route.params
	const chapterId = params?.id
	const { data, isLoading } = useGetEpisodes(chapterId)
	const { imageColors } = usePlayerBackground(data?.chapter.url ?? unknownTrackImageUri)
	const { t } = useTranslation()

	if (isLoading) return <Loading />

	return (
		<View style={defaultStyles.main}>
			<LinearGradientHeader colors={[imageColors[0] ?? colors.primary, 'transparent']} />

			<Header showBack title={t('home.list_episode')} />

			<EpisodeList data={data as EpisodeWithChapterAndBookType} />
		</View>
	)
}

export { EpisodeScreen }
