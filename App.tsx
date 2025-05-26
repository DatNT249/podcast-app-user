import { initI18n } from '@/libs/config/i18n'
import { queryClient } from '@/libs/config/react-query'
import { defaultTheme } from '@/libs/config/theme'
import { playbackService } from '@/libs/constants/playbackService'
import { useCheckPremium, useSleepTimer } from '@/libs/hooks'
import { useLogTrackPlayerState } from '@/libs/hooks/useLogTrackPlayerState'
import { useSetRatePlayer } from '@/libs/hooks/useSetRatePlayer'
import { useSetupTrackPlayer } from '@/libs/hooks/useSetupTrackPlayer'
import { reduxStore } from '@/libs/redux-store'
import { checkSubscriptionStatus, getAuth } from '@/libs/redux-store/slices'
import Navigation from '@/navigation/navigation'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer from 'react-native-track-player'
import { Provider } from 'react-redux'

TrackPlayer.registerPlaybackService(() => playbackService)

initI18n()

const App = () => {
	const bootstrap = () => {
		reduxStore.dispatch(getAuth())
		reduxStore.dispatch(checkSubscriptionStatus())
	}

	const { isInitialized } = useSetupTrackPlayer({
		onLoad: bootstrap,
	})

	useLogTrackPlayerState()

	useSleepTimer(isInitialized)

	useSetRatePlayer(isInitialized)

	useCheckPremium(isInitialized)

	useEffect(() => {
		bootstrap()
	}, [])

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<BottomSheetModalProvider>
					<Provider store={reduxStore}>
						<PaperProvider theme={defaultTheme}>
							<QueryClientProvider client={queryClient}>
								<SafeAreaProvider>
									<Navigation />
								</SafeAreaProvider>
							</QueryClientProvider>
						</PaperProvider>
					</Provider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

export default App
