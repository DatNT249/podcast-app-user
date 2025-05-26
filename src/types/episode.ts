import { BookType } from './../screens/BookScreen/types'
import { ChapterType } from './chapter'

export type EpisodeType = {
	_id: string
	title: string
	album: string
	artist: string
	artwork: string
	description: string
	url: string
	chapterId: ChapterType
	isFavorite: boolean
}

export type EpisodeWithChapterAndBookType = {
	book: BookType
	chapter: ChapterType
	episodes: EpisodeType[]
}

export type EpisodeResponseType = {
	data: EpisodeWithChapterAndBookType
}

export type EpisodeSkipResponseType = {
	data: EpisodeType
}

export type DetailEpisodeType = {
	chapterId: EpisodeType & {
		bookId: BookType
	}
} & EpisodeType

export type DetailEpisodeResponseType = {
	data: DetailEpisodeType
}

export type FavoriteResponseType = {
	favorites: EpisodeType[]
}

export type EpisodesTop10ResponseType = {
	data: EpisodeType[]
}

export type CategoryType = {
	_id: string
	name: string
	url: string
}

export type CategoryResponseType = {
	data: CategoryType[]
}

export type CategoryDetailType = {
	books: BookType[]
} & CategoryType

export type CategoryDetailResponseType = {
	data: CategoryDetailType
}
