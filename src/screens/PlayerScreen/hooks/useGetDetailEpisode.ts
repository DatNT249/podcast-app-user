import { getDetailEpisode } from '@/libs/api/episodes'
import { useQuery } from '@tanstack/react-query'

export const EPISODE_QUERY_KEY = 'EPISODE_QUERY_KEY'

export const useGetDetailEpisode = (episodeId: string) => {
	const data = useQuery({
		queryKey: [EPISODE_QUERY_KEY, episodeId],
		queryFn: () => getDetailEpisode(episodeId),
		enabled: !!episodeId,
	})

	return data
}
