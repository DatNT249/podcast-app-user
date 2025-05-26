import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import { useSnackbarStore } from '../store/snackbar'

export const TIME_TO_CHECK_PREMIUM = 10 // 5 minutes
export const TIME_DURATION = 1000 // 1 second

export const useCheckPremium = (isReady: React.MutableRefObject<boolean>) => {
	const activeTrack = useActiveTrack()
	const { showSnackbar } = useSnackbarStore()
	const { t } = useTranslation()

	useEffect(() => {
		if (!activeTrack || !activeTrack.isPremium) return

		const checkPremiumTrack = async () => {
			const progress = await TrackPlayer.getProgress()
			if (progress.position >= TIME_TO_CHECK_PREMIUM) {
				await TrackPlayer.pause()
				showSnackbar(t('premium.title'))
				await TrackPlayer.seekTo(0)
			}
		}

		const interval = setInterval(checkPremiumTrack, TIME_DURATION)
		return () => clearInterval(interval)
	}, [activeTrack, showSnackbar, isReady, t])
}
