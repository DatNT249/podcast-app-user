import { getNextEpisode } from '@/libs/api/episodes'
import { useQuery } from '@tanstack/react-query'
import { EpisodeSkipToNextResponseType } from './useSkipToPreviousMutation'

export const GET_NEXT_EPISODE_KEY = 'nextEpisode'

export const useGetNextEpisode = ({
	chapterId,
	currentEpisodeId,
}: EpisodeSkipToNextResponseType) => {
	const data = useQuery({
		queryKey: [GET_NEXT_EPISODE_KEY],
		queryFn: () => getNextEpisode({ chapterId, currentEpisodeId }),
	})

	return data
}
