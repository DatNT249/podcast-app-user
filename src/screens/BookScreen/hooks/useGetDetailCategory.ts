import { getDetailCategory } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const DETAIL_CATEGORY_QUERY_KEY = 'detail categories'

export const useGetDetailCategory = (id: string) => {
	const data = useQuery({
		queryKey: [DETAIL_CATEGORY_QUERY_KEY, id],
		queryFn: () => getDetailCategory(id),
	})

	return data
}
