import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { AntDesign } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

interface AboutThisEpisodeProps {
	title: string
	description: string
	onNavigate?: () => void
}

export const AboutThisEpisode = ({ description, title, onNavigate }: AboutThisEpisodeProps) => {
	return (
		<View style={{ backgroundColor: colors.grey, padding: 12, borderRadius: 8, gap: 12 }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text style={{ color: colors.text, fontWeight: '700', ...textStyles.text14 }}>{title}</Text>

				{onNavigate && (
					<Pressable onPress={onNavigate}>
						<AntDesign name="right" size={22} color={colors.text} />
					</Pressable>
				)}
			</View>

			<Text style={{ color: colors.textGrey, ...textStyles.text12 }}>{description}</Text>
		</View>
	)
}
