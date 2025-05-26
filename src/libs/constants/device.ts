import { Dimensions, Platform } from 'react-native'

const android = Platform.OS === 'android'
const iOS = Platform.OS === 'ios'
const web = Platform.OS === 'web'
const windowInfo = Dimensions.get('window')
const { height, width } = windowInfo
const aspectRatio = height / width

let iPhoneNotch = false
if (iOS) {
	if (height === 812 || height === 844 || height === 896 || height === 926) {
		iPhoneNotch = true
	}
}

export const device = {
	android,
	aspectRatio,
	height,
	iOS,
	iPhoneNotch,
	web,
	width,
}
