import { request } from '@/libs/config/request'
import { BookResponseType } from '@/screens/BookScreen'
import {
	CategoryDetailResponseType,
	CategoryResponseType,
	EpisodesTop10ResponseType,
} from '@/types/episode'

export const getBooks = async () => {
	try {
		const response = await request.get<BookResponseType>('/books')

		return response.data.data
	} catch (error) {
		console.log('API /books error', error)
		throw error
	}
}

export const searchBooks = async (keyword: string) => {
	try {
		const response = await request.get<BookResponseType>(`/books/all/no-pagination`, {
			params: {
				name: keyword,
			},
		})

		return response.data.data
	} catch (error) {
		console.log('API /books/search error', error)
		throw error
	}
}

export const getTop10Episodes = async () => {
	try {
		const response = await request.get<EpisodesTop10ResponseType>('/episodes/get/all-top')

		return response.data.data
	} catch (error) {
		console.log('API /episodes/get/all-top error', error)
		throw error
	}
}

export const getCategories = async () => {
	try {
		const response = await request.get<CategoryResponseType>('/categories/all/no-pagination')

		return response.data.data
	} catch (error) {
		console.log('API /categories/all/no-pagination error', error)
		throw error
	}
}

export const getDetailCategory = async (id: string) => {
	try {
		const response = await request.get<CategoryDetailResponseType>(`/categories/${id}`)

		return response.data.data
	} catch (error) {
		console.log('API /categories/:id error', error)
		throw error
	}
}
