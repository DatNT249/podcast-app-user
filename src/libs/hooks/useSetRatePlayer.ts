import { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { useRatePayer } from '../store/rate'

export const useSetRatePlayer = (isReady: React.MutableRefObject<boolean>) => {
	const { rate } = useRatePayer()

	const setRatePlayer = async (rate: number) => {
		try {
			await TrackPlayer.setRate(rate)
		} catch (err) {
			console.error('Error setting rate:', err)
		}
	}

	useEffect(() => {
		if (isReady.current) setRatePlayer(rate)
	}, [rate, isReady])
}
