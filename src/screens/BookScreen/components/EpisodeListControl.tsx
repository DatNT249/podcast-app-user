import { colors } from '@/libs/config/theme'
import { textStyles, utilsStyles } from '@/libs/constants'
import { playSelectedEpisode } from '@/libs/helpers/playSelectedEpisode'
import { useQueue } from '@/libs/store/queue'
import { EpisodeType } from '@/types/episode'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, FlatListProps, StyleSheet, Text, View } from 'react-native'
import { Track } from 'react-native-track-player'
import { EpisodeItem } from './EpisodeItem'

export type EpisodeListControlProps = Partial<FlatListProps<Track>> & {
	id: string
	episodes: EpisodeType[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const EpisodeListControl = ({ episodes, ...flatListProps }: EpisodeListControlProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()
	const { t } = useTranslation()

	return (
		<FlatList
			data={episodes}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128, paddingHorizontal: 20 }}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View style={styles.notFoundContainer}>
					<Text style={styles.notFoundText}>{t('common.episode_not_found')}</Text>
				</View>
			}
			renderItem={({ item }) => (
				<EpisodeItem
					episode={item}
					onTrackSelect={() => {
						playSelectedEpisode(item, episodes, activeQueueId, queueOffset, setActiveQueueId)
					}}
				/>
			)}
			{...flatListProps}
		/>
	)
}

const styles = StyleSheet.create({
	notFoundContainer: {
		alignItems: 'center',
		paddingTop: 100,
		justifyContent: 'center',
	},
	notFoundText: {
		...textStyles.text16,
		color: colors.text,
	},
})
