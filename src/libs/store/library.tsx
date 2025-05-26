import { Artist, Playlist, TrackWithPlaylist } from '@helpers/types'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	setTracks: (tracks: TrackWithPlaylist[]) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: [],
	setTracks: (tracks) => set({ tracks }),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})

export const usePlaylists = () => {
	const playlists = useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingPlaylist = acc.find((playlist) => playlist.playlistId === track.playlistId)

			if (existingPlaylist) {
				existingPlaylist.tracks.push(track)
			} else {
				acc.push({
					name: track.playlist ?? 'Unknown',
					tracks: [track],
					artworkPreview: track.artwork ?? unknownTrackImageUri,
					playlistId: track.playlistId,
				})
			}

			return acc
		}, [] as Playlist[])
	})

	return { playlists }
}
