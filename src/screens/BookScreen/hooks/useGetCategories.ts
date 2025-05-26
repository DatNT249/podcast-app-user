import { getCategories } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const CATEGORY_QUERY_KEY = 'categories'

export const useGetCategories = () => {
	const data = useQuery({
		queryKey: [CATEGORY_QUERY_KEY],
		queryFn: getCategories,
	})

	return data
}
