import { z } from 'zod'

export const AIBoxSchema = z.object({
	prompt: z.string().min(1, {
		message: 'Phần này không được để trống!',
	}),
})

export const AIBookSchema = z.object({
	content: z.string().min(100, {
		message: 'Phần này phải có ít nhất 100 ký tự!',
	}),
})

export type AIBookType = z.infer<typeof AIBookSchema>

export type AIBoxResult = {
	result: string
}
export type AIBoxType = z.infer<typeof AIBoxSchema>
