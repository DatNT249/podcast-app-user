import { STORAGE_KEY } from '@/libs/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAccessToken = async () => {
	try {
		return await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)
	} catch (error) {
		return null
	}
}

export const setAccessToken = async (token: string) => {
	try {
		await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token)
	} catch (error) {
		console.log(error)
	}
}

export const getRefreshToken = async () => {
	try {
		return await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN)
	} catch (error) {
		return null
	}
}

export const setRefreshToken = async (token: string) => {
	try {
		await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, token)
	} catch (error) {
		console.log(error)
	}
}

export const clearAuthStorage = async () => {
	try {
		await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
		await AsyncStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN)
	} catch (error) {
		console.log(error)
	}
}
