import { useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useGetRate = () => {
	const [rate, setRate] = useState<number>(0)
	const [isLoading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const getRate = async () => {
		try {
			setLoading(true)
			const rate = await TrackPlayer.getRate()
			setRate(rate)
		} catch (err) {
			setError('Error getting rate')
			console.error('Error getting rate:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getRate()
	}, [])

	return { rate, isLoading, error }
}
