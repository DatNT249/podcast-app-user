import { EpisodeType } from '@/types/episode'
import TrackPlayer from 'react-native-track-player'

export const playEpisodes = async (episodes?: EpisodeType[]) => {
	if (!episodes) return

	await TrackPlayer.reset()
	await TrackPlayer.add(episodes)
	await TrackPlayer.play()
}
