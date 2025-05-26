import unknownTrack from '@/assets/images/book.png'
import { device } from '@/constants'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface ImageBookProps {
	url?: string
}

const ImageBook: React.FC<ImageBookProps> = ({ url }) => {
	return (
		<View style={styles.imageContainer}>
			<Image source={url ? { uri: url } : unknownTrack} style={styles.image} />
		</View>
	)
}

export { ImageBook }

const styles = StyleSheet.create({
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: device.width / 2,
		height: device.width / 2,
		borderRadius: 8,
		objectFit: 'contain',
	},
})
