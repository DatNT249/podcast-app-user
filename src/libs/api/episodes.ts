import {
	DetailEpisodeResponseType,
	EpisodeResponseType,
	FavoriteResponseType,
} from '@/types/episode'
import { request } from '../config/request'

export const getEpisodes = async () => {
	try {
		const response = await request.get<EpisodeResponseType>('/episodes')

		return response.data
	} catch (error) {
		console.log('API /episodes error', error)
	}
}

export const getEpisodesByChapterId = async (chapterId: string) => {
	try {
		const response = await request.get<EpisodeResponseType>(`/episodes/chapter/${chapterId}`)

		return response.data.data
	} catch (error) {
		console.log('API /episodes/:chapterId error', error)
	}
}

export const getDetailEpisode = async (episodeId: string) => {
	try {
		const response = await request.get<DetailEpisodeResponseType>(`/episodes/${episodeId}/by-me`)

		return response.data.data
	} catch (error) {
		console.log(`API /episodes/:${episodeId}/by-me error`, error)
	}
}

export const favoriteEpisode = async (episodeId: string) => {
	try {
		const response = await request.patch(`/users/favorite/episode/${episodeId}`)
		return response.data
	} catch (error) {
		console.log(`API /episodes/:${episodeId}/favorite error`, error)
	}
}

export const unFavoriteEpisode = async (episodeId: string) => {
	try {
		const response = await request.patch(`/users/unmark-favorite/episode/${episodeId}`)

		return response.data
	} catch (error) {
		console.log(`API /episodes/:${episodeId}/unfavorite error`, error)
	}
}

export const getFavoriteEpisodes = async () => {
	try {
		const response = await request.get<FavoriteResponseType>('/users/episodes/by-me')

		return response.data
	} catch (error) {
		console.log('API /users/episodes/by-me error', error)
	}
}
