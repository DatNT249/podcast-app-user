import { signIn } from '@/libs/api/auth'
import { useMutation } from '@tanstack/react-query'

export const useSignInMutation = () => {
	const mutation = useMutation({
		mutationFn: signIn,
	})

	return mutation
}
