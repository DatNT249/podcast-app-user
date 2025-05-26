import { signUp } from '@/libs/api/auth'
import { useMutation } from '@tanstack/react-query'

export const useSignUpMutation = () => {
	const mutation = useMutation({
		mutationFn: signUp,
	})

	return mutation
}
