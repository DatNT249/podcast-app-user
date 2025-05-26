import { EpisodeType } from '@/types/episode'
import TrackPlayer, { Track } from 'react-native-track-player'
import { generateMediaUrl } from './generateMediaUrl'

export const playSelectedEpisode = async (
	selectedEpisode: Track,
	episodes: EpisodeType[],
	activeQueueId: string | null,
	queueOffset: React.MutableRefObject<number>,
	setActiveQueueId: (id: string) => void,
) => {
	const mapperEpisodes = episodes.map((episode) => ({
		...episode,
		url: generateMediaUrl(episode.url, 'audio'),
	}))
	const episodeIndex = mapperEpisodes.findIndex(
		(episode) => episode.url === generateMediaUrl(selectedEpisode.url, 'audio'),
	)

	const changeSelectedEpisode = {
		...selectedEpisode,
		url: generateMediaUrl(selectedEpisode.url, 'audio'),
	}

	if (episodeIndex === -1) return
	const isChangingQueue = selectedEpisode._id !== activeQueueId

	if (isChangingQueue) {
		const beforeEpisodes = mapperEpisodes.slice(0, episodeIndex)
		const afterEpisodes = mapperEpisodes.slice(episodeIndex + 1)

		await TrackPlayer.reset()
		await TrackPlayer.add(changeSelectedEpisode)
		await TrackPlayer.add(afterEpisodes)
		await TrackPlayer.add(beforeEpisodes)

		await TrackPlayer.play()

		queueOffset.current = episodeIndex
		setActiveQueueId(selectedEpisode._id)
	} else {
		const nextTrackIndex =
			episodeIndex - queueOffset.current < 0
				? mapperEpisodes.length + episodeIndex - queueOffset.current
				: episodeIndex - queueOffset.current

		await TrackPlayer.skip(nextTrackIndex)
		TrackPlayer.play()
	}
}
