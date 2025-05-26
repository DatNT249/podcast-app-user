import { useTranslation } from 'react-i18next'

export const useFormatTime = () => {
	const { t } = useTranslation()

	const formatTime = (time: number): string => {
		if (time < 0) {
			return 'Invalid time'
		}

		const hours = Math.floor(time / 3600)
		const minutes = Math.floor((time % 3600) / 60)
		const seconds = time % 60

		if (hours > 0) {
			return `${hours} ${t('timer.hour')} ${minutes} ${t('minute')}`
		} else if (minutes > 0) {
			return `${minutes} ${t('minute')}`
		} else {
			return `${seconds} ${t('second')}`
		}
	}

	return { formatTime }
}
