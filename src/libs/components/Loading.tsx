import { SafeAreaView } from 'react-native'
import LoaderKit from 'react-native-loader-kit'
import { colors } from '../config/theme'

const Loading = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors.background,
			}}
		>
			<LoaderKit style={{ width: 28, height: 30 }} name="LineScaleParty" color={colors.primary} />
		</SafeAreaView>
	)
}

export { Loading }
