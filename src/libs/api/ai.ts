import { AIBookType, AIBoxResult, AIBoxType } from '@/types/ai'
import axios from 'axios'
import { request } from '../config/request'

export const postAIPrompt = async (data: AIBoxType) => {
	const response = await request.post<AIBoxResult>('/ai-chats/generate', data)

	return response.data
}

export const postAIBook = async (data: AIBookType) => {
	try{
		console.log(data)
		const response = await axios.post('https://152f-183-80-131-3.ngrok-free.app/api/sumary/', {
			data,
		})
		console.log('RESPONSE', response.data)
	return response.data

	}catch(err){
		console.log(err)
	}
	

}
