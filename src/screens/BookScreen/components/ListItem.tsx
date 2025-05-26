import { colors } from '@/libs/config/theme'
import { textStyles } from '@/libs/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FlatList, ListRenderItem, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Surface } from 'react-native-paper'
import { ListItemSkeleton } from './ListItemSkeleton'

interface ListItemProps<T> {
	title: string
	data: T[] | null | undefined
	renderItem: ListRenderItem<T> | null | undefined
	isLoading?: boolean
	showViewAll?: boolean
	onViewAllPress?: () => void
}

export const ListItem = <T,>({ 
	data, 
	renderItem, 
	title, 
	isLoading,
	showViewAll,
	onViewAllPress
}: ListItemProps<T>) => {
	if (isLoading) return <ListItemSkeleton />

	return (
		<View style={styles.container}>
			{/* Section Header */}
			<View style={styles.headerContainer}>
				<Surface style={styles.headerSurface}>
					<View style={styles.titleContainer}>
						<MaterialCommunityIcons name="bookmark" size={20} color={colors.primary} />
						<Text style={styles.title}>{title}</Text>
					</View>

					
				</Surface>
			</View>

			{/* Item List */}
			<FlatList
				contentContainerStyle={styles.flatListContent}
				data={data}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				horizontal
				nestedScrollEnabled
				showsHorizontalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		paddingBottom: 8,
	},
	headerContainer: {
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	headerSurface: {
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.backgroundElevated,
		elevation: 2,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	title: {
		...textStyles.text16,
		fontWeight: '600',
		color: colors.text,
	},
	viewAllButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	viewAllText: {
		...textStyles.text14,
		color: colors.primary,
		marginRight: 4,
	},
	flatListContent: {
		paddingHorizontal: 16,
		paddingTop: 4,
		paddingBottom: 8,
		flexGrow: 1,
	},
	separator: { 
		width: 12 
	},
})
