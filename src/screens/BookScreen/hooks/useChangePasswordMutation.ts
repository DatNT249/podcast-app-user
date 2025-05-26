import { changePassword } from '@/libs/api/auth'
import { NavigationProp } from '@/navigation'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

export const useChangePasswordMutation = () => {
	const { t } = useTranslation()
	const navigation = useNavigation<NavigationProp>()

	const mutation = useMutation({
		mutationFn: changePassword,
		onSuccess: () => {
			Alert.alert(t('change_password.success'))
			navigation.navigate('BottomTabs', {
				screen: 'TAB_HOME',
				params: {
					screen: 'INDEX_HOME',
				},
			})
		},
		onError: () => {
			Alert.alert(t('change_password.error'))
		},
	})

	return mutation
}
