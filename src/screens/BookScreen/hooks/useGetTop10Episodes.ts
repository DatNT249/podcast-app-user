import { getTop10Episodes } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const TOP10_EPISODES_QUERY_KEY = 'top10Episodes'

export const useGetTop10Episodes = () => {
	const data = useQuery({
		queryKey: [TOP10_EPISODES_QUERY_KEY],
		queryFn: getTop10Episodes,
	})

	return data
}
