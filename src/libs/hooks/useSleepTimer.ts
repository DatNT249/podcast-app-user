import { MutableRefObject, useEffect } from 'react'
import TrackPlayer, { Event, useIsPlaying } from 'react-native-track-player'
import { useBookTimer } from '../store/timer'

export const useSleepTimer = (isReady: MutableRefObject<boolean>) => {
	const { isTimerActive, timerDuration, clearTimer, setTimeLeft, isPlayingEndBook } = useBookTimer()
	const { playing } = useIsPlaying()

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined
		let startTime: number | undefined
		let trackPlayerEvents: { remove: () => void } | undefined

		const handlePlaybackActiveTrackChanged = async () => {
			await TrackPlayer.pause().finally(() => {
				clearTimer()
			})
		}

		if (isPlayingEndBook) {
			trackPlayerEvents = TrackPlayer.addEventListener(
				Event.PlaybackActiveTrackChanged,
				handlePlaybackActiveTrackChanged,
			)
		}

		if (isTimerActive && timerDuration > 0) {
			startTime = Date.now()
			timer = setInterval(async () => {
				const elapsedTime = Math.floor((Date.now() - startTime!) / 1000)
				const timeLeft = timerDuration - elapsedTime
				setTimeLeft(timeLeft)

				if (timeLeft <= 0) {
					clearInterval(timer!)
					try {
						if (playing) await TrackPlayer.pause()
					} catch (error) {
						console.error('Error pausing TrackPlayer:', error)
					} finally {
						clearTimer()
					}
				}
			}, 1000)
		}

		return () => {
			if (timer) clearInterval(timer)
			if (trackPlayerEvents) trackPlayerEvents.remove()
		}
	}, [isTimerActive, timerDuration, clearTimer, setTimeLeft, playing, isReady, isPlayingEndBook])
}
