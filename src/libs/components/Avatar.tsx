import { Text, TouchableOpacity } from 'react-native'
import { colors } from '../config/theme'
import { useAppSelector } from '../redux-store/reduxHook'

interface AvatarProps {
	onPress?: () => void
	size: number
	textSize?: number
}

export const Avatar = ({ onPress, size, textSize = 14 }: AvatarProps) => {
	const { user } = useAppSelector((state) => state.auth)
	const name = user?.name.charAt(0).toUpperCase() || 'A'

	return (
		<TouchableOpacity
			style={{
				backgroundColor: colors.backgroundYellow,
				width: size,
				height: size,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 100,
			}}
			onPress={onPress}
		>
			<Text style={{ color: colors.background, fontSize: textSize }}>{name}</Text>
		</TouchableOpacity>
	)
}
