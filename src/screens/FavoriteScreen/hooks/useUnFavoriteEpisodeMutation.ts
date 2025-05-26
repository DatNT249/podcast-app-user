import { unFavoriteEpisode } from '@/libs/api/episodes'
import { useSnackbarStore } from '@/libs/store/snackbar'
import { UN_FAVORITE_EPISODE_MUTATION_KEY } from '@/screens/PlayerScreen'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { FAVORITE_EPISODES_QUERY_KEY } from './useGetFavoriteEpisodes'

export const useUnFavoriteEpisodeMutation = () => {
	const queryClient = useQueryClient()
	const { showSnackbar } = useSnackbarStore()
	const { t } = useTranslation()

	const mutation = useMutation({
		mutationKey: [UN_FAVORITE_EPISODE_MUTATION_KEY],
		mutationFn: unFavoriteEpisode,
		onSuccess: () => {
			showSnackbar(t('common.remove_favorite_success'))
			queryClient.invalidateQueries({ queryKey: [FAVORITE_EPISODES_QUERY_KEY] })
		},
		onError: () => {
			showSnackbar(t('common.remove_favorite_error'))
		},
	})

	return mutation
}
