import { BookType } from '@/screens/BookScreen'

export type ChapterType = {
	_id: string
	name: string
	description: string
	url: string
	bookId: BookType
	_createdAt: string
}

export type ChapterListType = ChapterType[]

export type ChapterListWithBookType = {
	book: BookType
	chapters: ChapterType[]
}

export type ChapterResponseType = {
	data: ChapterListWithBookType
}
