import { unFavoriteEpisode } from '@/libs/api/episodes'
import { useSnackbarStore } from '@/libs/store/snackbar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { EPISODE_QUERY_KEY } from './useGetDetailEpisode'

export const UN_FAVORITE_EPISODE_MUTATION_KEY = 'UnFavoriteEpisode'

export const useUnFavoriteEpisodeMutation = () => {
	const queryClient = useQueryClient()
	const { showSnackbar } = useSnackbarStore()
	const { t } = useTranslation()

	const mutation = useMutation({
		mutationKey: [UN_FAVORITE_EPISODE_MUTATION_KEY],
		mutationFn: unFavoriteEpisode,
		onSuccess: (_, id) => {
			showSnackbar(t('common.remove_favorite_success'))
			queryClient.invalidateQueries({ queryKey: [EPISODE_QUERY_KEY, id] })
		},
		onError: () => {
			showSnackbar(t('common.remove_favorite_error'))
		},
	})

	return mutation
}
