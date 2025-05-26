import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { getColors } from 'react-native-image-colors'
import { AndroidImageColors, IOSImageColors } from 'react-native-image-colors/build/types'
import { colors } from '../config/theme'

export const usePlayerBackground = (imageUrl: string) => {
	const [iosImageColors, setIosImageColors] = useState<IOSImageColors | null>(null)
	const [androidImageColors, setAndroidImageColors] = useState<AndroidImageColors | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => {
			setIosImageColors(colors.platform === 'ios' ? (colors as IOSImageColors) : null)
			setAndroidImageColors(colors.platform === 'android' ? (colors as AndroidImageColors) : null)
		})
	}, [imageUrl])

	const androidColors = androidImageColors
		? [androidImageColors.darkVibrant, androidImageColors.darkMuted]
		: [colors.black, 'transparent']

	const iosColors = iosImageColors
		? [iosImageColors.background, iosImageColors.primary]
		: [colors.text, 'transparent']

	const imageColors = Platform.OS === 'android' ? androidColors : iosColors

	return { imageColors }
}
