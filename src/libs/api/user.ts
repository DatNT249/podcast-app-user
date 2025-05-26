import { ChangeProfileResponse, ChangeProfileType } from '@/screens/ChangeProfileScreen'
import { request } from '../config/request'

export const changeProfile = async (data: ChangeProfileType) => {
	try {
		const response = await request.patch<ChangeProfileResponse>('/users/update-profile/by-me', data)
		return response.data
	} catch (error) {
		console.log('API /users/update-profile/by-me error: ', error)
		throw error
	}
}
