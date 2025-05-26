import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getLanguage } from '../async-storage'

export const GET_LANGUAGE_KEY = 'GET_LANGUAGE'

export const useGetLocalLanguage = () => {
	const { i18n } = useTranslation()

	useQuery({
		queryFn: async () => {
			const language = await getLanguage()
			if (language) i18n.changeLanguage(language)

			return language
		},
		queryKey: [GET_LANGUAGE_KEY],
	})
}
