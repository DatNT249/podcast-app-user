import { changeProfile } from '@/libs/api'
import { useMutation } from '@tanstack/react-query'

export const useChangeProfileMutation = () => {
	const mutation = useMutation({
		mutationFn: changeProfile,
	})

	return mutation
}
