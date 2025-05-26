import { useTranslation } from 'react-i18next'

export const useTranslateMessage = () => {
	const { t } = useTranslation()

	const getMessageError = (key: string) => {
		return t(`message.${key}`)
	}

	return { getMessageError }
}
