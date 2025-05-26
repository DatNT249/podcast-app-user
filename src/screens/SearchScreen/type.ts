import { TypeOf, z } from 'zod'

export const SearchInputSchema = z.object({
	keyword: z.string().min(1, { message: 'Vui lòng nhập từ khóa' }),
})

export type SearchInputType = TypeOf<typeof SearchInputSchema>
