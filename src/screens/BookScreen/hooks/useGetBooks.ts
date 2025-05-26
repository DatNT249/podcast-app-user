import { getBooks } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const STORY_QUERY_KEY = 'stories'

export const useGetBooks = () => {
	const data = useQuery({
		queryKey: [STORY_QUERY_KEY],
		queryFn: getBooks,
	})

	return data
}
