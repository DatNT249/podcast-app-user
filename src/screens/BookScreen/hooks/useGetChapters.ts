import { getChapterByBookId } from '@/libs/api/chapters'
import { useQuery } from '@tanstack/react-query'

export const CHAPTER_QUERY_KEY = 'chapters'

export const useGetChapters = (bookId: string) => {
	const data = useQuery({
		queryKey: [CHAPTER_QUERY_KEY, bookId],
		queryFn: () => getChapterByBookId(bookId),
	})

	return data
}
