export type User = {
	_id: string
	email: string
	name: string
	gender: string
	phoneNumber: string
	dateOfBirth: string
	address: string
}

export type UserResponse = {
	data: User
}
