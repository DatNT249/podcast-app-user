import { searchBooks } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const useQuerySearch = (keyword: string) => {
	const data = useQuery({
		queryKey: ['search', keyword],
		queryFn: () => searchBooks(keyword),
	})

	return data
}
