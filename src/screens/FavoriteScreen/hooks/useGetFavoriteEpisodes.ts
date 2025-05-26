import { getFavoriteEpisodes } from '@/libs/api/episodes'
import { useQuery } from '@tanstack/react-query'

export const FAVORITE_EPISODES_QUERY_KEY = 'FAVORITE_EPISODES_QUERY_KEY'

export const useGetFavoriteEpisodes = () => {
	const data = useQuery({
		queryKey: [FAVORITE_EPISODES_QUERY_KEY],
		queryFn: getFavoriteEpisodes,
	})

	return data
}
