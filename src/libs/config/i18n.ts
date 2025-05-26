import enResource from '@/assets/locales/en.json'
import viResource from '@/assets/locales/vi.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
	en: { translation: enResource },
	vi: { translation: viResource },
}

export const initI18n = async () => {
	try {
		i18n.use(initReactI18next).init({
			compatibilityJSON: 'v3',
			resources,
			lng: 'vi',
			fallbackLng: 'vi',
			interpolation: {
				escapeValue: false,
			},
		})
	} catch (error) {
		console.error('Error initializing i18n:', error)
		throw error
	}
}

export const listLanguage: { label: string; value: string }[] = [
	{ label: 'EN', value: 'en' },
	{ label: 'VI', value: 'vi' },
]
