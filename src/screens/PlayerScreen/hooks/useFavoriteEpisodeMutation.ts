import { favoriteEpisode } from '@/libs/api/episodes'
import { useSnackbarStore } from '@/libs/store/snackbar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { EPISODE_QUERY_KEY } from './useGetDetailEpisode'

export const FAVORITE_EPISODE_MUTATION_KEY = 'favoriteEpisode'

export const useFavoriteEpisodeMutation = () => {
	const queryClient = useQueryClient()
	const { showSnackbar } = useSnackbarStore()
	const { t } = useTranslation()

	const mutation = useMutation({
		mutationKey: [FAVORITE_EPISODE_MUTATION_KEY],
		mutationFn: favoriteEpisode,
		onSuccess: (_, input) => {
			showSnackbar(t('common.add_favorite_success'))
			queryClient.invalidateQueries({ queryKey: [EPISODE_QUERY_KEY, input] })
		},
		onError: () => {
			showSnackbar(t('common.add_favorite_error'))
		},
	})

	return mutation
}
