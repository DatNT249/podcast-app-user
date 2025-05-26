import { request } from '@/libs/config/request'
import { SignInResponse, SignInType, SignUpResponse } from '@/screens/AuthScreen'
import { ChangePasswordType } from '@/screens/BookScreen'
import { UserResponse } from '@/types/user'

export const signIn = async (data: SignInType) => {
	try {
		const response = await request.post<SignInResponse>('/auth/signin', data)

		return response.data.data
	} catch (error) {
		console.log('API /auth/sign-in error: ', error)
		throw error
	}
}

export const getMe = async () => {
	try {
		const response = await request.get<UserResponse>('/auth/me')

		return response.data.data
	} catch (error) {
		console.log('API /auth/me error: ', error)
		throw error
	}
}

export const signUp = async (data: SignInType) => {
	try {
		const response = await request.post<SignUpResponse>('/auth/signup', data)

		return response.data.data
	} catch (error) {
		console.log('API /auth/sign-up error: ', error)
		throw error
	}
}

export const changePassword = async (data: ChangePasswordType) => {
	try {
		const response = await request.patch<UserResponse>('/auth/change-password', data)

		return response.data.data
	} catch (error) {
		console.log('API /auth/change-password error: ', error)
		throw error
	}
}
