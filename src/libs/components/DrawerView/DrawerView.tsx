import { colors } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { useAppSelector } from '@/libs/redux-store/reduxHook'
import { NavigationProp } from '@/navigation'
import { MainBottomTabParamList } from '@/navigation/BottomTabs'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { type IconProps } from '@expo/vector-icons/build/createIconSet'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Surface } from 'react-native-paper'
import { Avatar } from '../Avatar'
import { FooterDrawer } from './FooterDrawer'
import { LinearGradient } from 'expo-linear-gradient'

export const DrawerView = (props: DrawerContentComponentProps) => {
	const { user } = useAppSelector((state) => state.auth)
	const navigation = useNavigation<NavigationProp>()
	const { t } = useTranslation()

	const redirectToDetailProfile = () => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: {
				screen: 'CHANGE_PROFILE',
			},
		})
	}

	type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type MenuListItem = {
		name: string;
		iconSize: number;
		iconColor: string;
		screen: MainBottomTabParamList['TAB_HOME']['screen'];
	} & (
		| { iconType: 'material'; iconName: ComponentProps<typeof MaterialIcons>['name'] }
		| { iconType: 'material-community'; iconName: ComponentProps<typeof MaterialCommunityIcons>['name'] }
	);

	const menuLists: MenuListItem[] = [
		{
			name: t('drawer.favorites'),
			iconName: 'heart',
			iconSize: 22,
			iconColor: colors.primary,
			iconType: 'material-community' as const,
			screen: 'FAVORITE',
		},
		{
			name: t('drawer.change_password'),
			iconName: 'shield-key',
			iconSize: 22,
			iconColor: colors.secondary,
			iconType: 'material-community' as const,
			screen: 'CHANGE_PASSWORD',
		},
	]

	const redirectToScreen = (screen: MainBottomTabParamList['TAB_HOME']['screen']) => {
		navigation.navigate('BottomTabs', {
			screen: 'TAB_HOME',
			params: {
				screen: screen,
			},
		})
		props.navigation.closeDrawer()
	}

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={[colors.background, colors.backgroundElevated]}
				style={styles.gradient}
			>
				{/* Header/Profile Section */}
				<Surface style={styles.headerContainer} elevation={4}>
					<LinearGradient
						colors={[colors.primaryDark, colors.primary]}
						style={styles.headerGradient}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					/>
					
					<Pressable style={styles.profileContent} onPress={redirectToDetailProfile}>
						<View style={styles.avatarContainer}>
							<Avatar size={60} textSize={30} />
						</View>

						<View style={styles.userInfo}>
							<Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
							<View style={styles.userDetail}>
								<MaterialCommunityIcons name="account-edit" size={16} color={colors.white} />
								<Text style={styles.userDetailText}>{t('drawer.information')}</Text>
							</View>
						</View>
					</Pressable>
				</Surface>

				{/* Menu List */}
				<View style={styles.menuContainer}>
					<Text style={styles.menuTitle}>{t('drawer.menu')}</Text>
					
					<FlashList
					data={menuLists}
					renderItem={({ item }) => {
						const { name, iconSize, iconColor, iconType, screen } = item;
						
						return (
							<Pressable
								style={styles.menuItem}
								onPress={() => redirectToScreen(screen)}
								android_ripple={{ color: colors.primaryLight, borderless: false }}
							>
								<View style={styles.menuIconContainer}>
									{iconType === 'material-community' ? (
										<MaterialCommunityIcons 
											name={(item as any).iconName} 
											size={iconSize} 
											color={iconColor} 
										/>
									) : (
										<MaterialIcons 
											name={(item as any).iconName}
											size={iconSize} 
											color={iconColor} 
										/>
									)}
								</View>
								<Text style={styles.menuText}>{name}</Text>
							</Pressable>
						);
					}}
						estimatedListSize={{ height: 300, width: 300 }}
						estimatedItemSize={56}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						showsVerticalScrollIndicator={false}
						ListFooterComponent={<FooterDrawer />}
					/>
				</View>
			</LinearGradient>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	gradient: {
		flex: 1,
	},
	headerContainer: {
		height: 180,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		overflow: 'hidden',
		backgroundColor: 'transparent',
		marginBottom: 24,
	},
	headerGradient: {
		...StyleSheet.absoluteFillObject,
		opacity: 0.95,
	},
	profileContent: {
		position: 'relative',
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarContainer: {
		marginBottom: 16,
		borderWidth: 2,
		borderColor: colors.white,
		borderRadius: 40,
		padding: 2,
	},
	userInfo: {
		alignItems: 'center',
	},
	userName: {
		...textStyles.text18,
		color: colors.white,
		fontWeight: '700',
		marginBottom: 4,
		letterSpacing: 0.5,
	},
	userDetail: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 12,
	},
	userDetailText: {
		...textStyles.text12,
		color: colors.white,
		fontWeight: '500',
	},
	menuContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	menuTitle: {
		...textStyles.text14,
		color: colors.textSecondary,
		marginBottom: 12,
		paddingLeft: 16,
		fontWeight: '600',
		letterSpacing: 1,
		textTransform: 'uppercase',
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 12,
	},
	menuIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.cardBackground,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16,
	},
	menuText: {
		...textStyles.text16,
		color: colors.text,
		fontWeight: '500',
		flex: 1,
	},
	separator: {
		height: 1,
		backgroundColor: colors.border,
		marginVertical: 2,
		marginLeft: 68,
		opacity: 0.3,
	},
})
