import { ChapterResponseType } from '@/types/chapter'
import { request } from '../config/request'

export const getChapters = async () => {
	try {
		const response = await request.get<ChapterResponseType>('/chapters')

		return response.data.data
	} catch (error) {
		console.log('API /chapters error', error)
		throw error
	}
}

export const getChapterByBookId = async (bookId: string) => {
	try {
		const response = await request.get<ChapterResponseType>(`/chapters/book/${bookId}`)

		return response.data.data
	} catch (error) {
		console.log('API /chapters/:bookId error', error)
		throw error
	}
}
