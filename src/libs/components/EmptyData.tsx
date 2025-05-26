import BookImage from '@/assets/images/book.png'
import { colors } from '@/libs/config/theme'
import { device } from '@/libs/constants'
import { Image, StyleSheet, Text, View } from 'react-native'

type EmptyDataProps = {
	title?: string
}

const EmptyData = ({ title }: EmptyDataProps) => {
	return (
		<View style={styles.container}>
			<Image source={BookImage} style={{ width: 100, height: 100 }} />
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

export { EmptyData }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: device.height / 2,
		gap: 20,
	},
	text: {
		color: colors.text,
		fontSize: 18,
		fontWeight: 'bold',
	},
})
