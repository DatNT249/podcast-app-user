import { getAccessToken } from '@/libs/async-storage'
import { STORAGE_KEY } from '@/libs/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useEffect } from 'react'

const baseURL = 'http://192.168.1.8:8001/api'

export const request = Axios.create({
	baseURL,
})

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	const token = await getAccessToken()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	console.log(
		'REQUEST SEND',
		JSON.stringify({
			method: config.method,
			url: `${config.baseURL}${config.url}`,
			version: config.headers.version,
			platform: config.headers.platform,
			data: config.data,
			params: config.params,
		}),
	)

	return config
}

request.interceptors.request.use(authRequestInterceptor)

const AxiosInterceptor = ({ children }: any) => {
	useEffect(() => {
		const resInterceptor = (response: AxiosResponse) => {
			return response
		}

		const errInterceptor = (error: AxiosError) => {
			if (error.response?.status === 401) {
				AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
				AsyncStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN)
			}
			return Promise.reject(error)
		}

		const interceptor = request.interceptors.response.use(resInterceptor, errInterceptor)

		return () => request.interceptors.response.eject(interceptor)
	}, [])

	return children
}

export { AxiosInterceptor }
