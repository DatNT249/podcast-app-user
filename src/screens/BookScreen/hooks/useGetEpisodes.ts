import { getEpisodesByChapterId } from '@/libs/api/episodes'
import { useQuery } from '@tanstack/react-query'

export const EPISODES_QUERY_KEY = 'episodes'

export const useGetEpisodes = (chapterId: string) => {
	const data = useQuery({
		queryKey: [EPISODES_QUERY_KEY, chapterId],
		queryFn: () => getEpisodesByChapterId(chapterId),
		enabled: !!chapterId,
	})

	return data
}
