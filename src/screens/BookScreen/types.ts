import { TypeOf, z } from 'zod'

export type BookType = {
	_id: string
	name: string
	description: string
	url: string
	isPremium: boolean
	author: string
}

export type BookResponseType = {
	data: BookType[]
}

export const ChangePasswordSchema = z.object({
	currentPassword: z.string().min(1, {
		message: 'field_required',
	}),
	newPassword: z.string().min(1, {
		message: 'field_required',
	}),
})

export type ChangePasswordType = TypeOf<typeof ChangePasswordSchema>
