import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_KEY } from '../constants'

export const setLanguage = async (language: string) => {
	await AsyncStorage.setItem(STORAGE_KEY.LANGUAGE, language)
}

export const getLanguage = async () => {
	try {
		return await AsyncStorage.getItem(STORAGE_KEY.LANGUAGE)
	} catch (error) {
		return null
	}
}
