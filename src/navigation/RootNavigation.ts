import {
	CommonActions,
	StackActions,
	TabActions,
	createNavigationContainerRef,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.navigate(StackActions.push(name, params) as never)
	}
}

export function push(name: string, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(StackActions.push(name, params))
	}
}

export function replace(name: string, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(StackActions.replace(name, params))
	}
}

export function setParams(params: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(CommonActions.setParams(params))
	}
}

export function getRoute() {
	return navigationRef.current?.getCurrentRoute()
}

export function jumpTo(name: string, params?: object) {
	if (navigationRef.isReady()) {
		navigationRef.current?.dispatch(TabActions.jumpTo(name, params))
	}
}
