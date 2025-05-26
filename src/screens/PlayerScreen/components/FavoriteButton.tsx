import { colors } from '@/libs/config/theme'
import { DetailEpisodeType } from '@/types/episode'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { useFavoriteEpisodeMutation, useUnFavoriteEpisodeMutation } from '../hooks'

interface FavoriteButtonProps {
	episodeDetail: DetailEpisodeType | undefined
}

export const FavoriteButton = ({ episodeDetail }: FavoriteButtonProps) => {
	const { mutate: favorite } = useFavoriteEpisodeMutation()
	const { mutateAsync: unFavorite } = useUnFavoriteEpisodeMutation()

	const handleFavorite = async () => {
		const episodeId = episodeDetail?._id
		if (!episodeId) return

		if (episodeDetail?.isFavorite) {
			await unFavorite(episodeId)
			return
		}

		favorite(episodeId)
	}

	return (
		<Pressable onPress={handleFavorite}>
			<MaterialCommunityIcons
				name={episodeDetail?.isFavorite ? 'heart' : 'heart-outline'}
				size={32}
				color={episodeDetail?.isFavorite ? colors.primary : colors.text}
			/>
		</Pressable>
	)
}
