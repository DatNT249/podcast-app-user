import { format } from 'date-fns'

export const formatDate = (date: string | Date, formatting = 'yyyy.MM.dd') => {
	return format(new Date(date), formatting)
}

export const formatTime = (time: number): string => {
	if (time < 0) {
		return 'Invalid time'
	}

	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = time % 60

	if (hours > 0) {
		return `${hours} giờ ${minutes} phút`
	} else if (minutes > 0) {
		return `${minutes} phút`
	} else {
		return `${seconds} giây`
	}
}
