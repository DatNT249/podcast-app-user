import { User } from '@/types/user'
import { TypeOf, z } from 'zod'

export const SignInSchema = z.object({
	email: z.string().email({ message: 'email_invalid' }).min(1, { message: 'enter_email' }),
	password: z.string().min(1, {
		message: 'enter_password',
	}),
})

export const SignUpSchema = z.object({
	email: z.string().email({ message: 'email_invalid' }).min(1, { message: 'enter_email' }),
	password: z.string().min(1, {
		message: 'enter_password',
	}),
	name: z.string().min(1, {
		message: 'enter_name',
	}),
})

export type SignInType = TypeOf<typeof SignInSchema>
export type SignUpType = TypeOf<typeof SignUpSchema>

export type SignInResponse = {
	data: {
		user: User
		accessToken: string
		refreshToken: string
	}
}

export type SignUpResponse = {
	data: {
		user: User
	}
}
