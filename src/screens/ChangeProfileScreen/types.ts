import { TypeOf, z } from 'zod'

export const ChangeProfileSchema = z.object({
	name: z.string().min(1, { message: 'enter_name' }),
	dateOfBirth: z.string(),
	gender: z.string(),
	address: z.string().min(1, { message: 'enter_address' }),
	phoneNumber: z.string().min(1, { message: 'enter_phone' }),
})

export type ChangeProfileType = TypeOf<typeof ChangeProfileSchema>
export type ChangeProfileResponse = {
	data: ChangeProfileType
}
