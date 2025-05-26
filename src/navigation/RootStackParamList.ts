import { AuthStackParams } from './AuthStack/AuthStackParams'
import { MainBottomTabParamList } from './BottomTabs/MainBottomTabParams'
import { SearchStackParams } from './BottomTabs/TabSearch/SearchStackParams'
import { PlayerStackParams } from './PlayerStack/PlayerStackParams'

type NestedNavigatorParams<ParamList> = {
	[K in keyof ParamList]: undefined extends ParamList[K]
		? { screen: K; params?: ParamList[K] }
		: { screen: K; params: ParamList[K] }
}[keyof ParamList]

export type RootStackParamList = {
	BottomTabs: NestedNavigatorParams<MainBottomTabParamList>
	AuthStack: NestedNavigatorParams<AuthStackParams>
	PlayerStack: NestedNavigatorParams<PlayerStackParams>
	SearchStack: NestedNavigatorParams<SearchStackParams>
}
