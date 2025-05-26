import { View } from 'moti'
import { Skeleton } from 'moti/skeleton'

export const ListItemSkeleton = () => {
	return (
		<View style={{ paddingTop: 10, paddingHorizontal: 20, gap: 10 }}>
			<Skeleton height={24} width={70} radius={2} colorMode="dark" />

			<View style={{ flexDirection: 'row', gap: 12 }}>
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton
						key={index}
						height={130}
						width={120}
						colorMode="dark"
						radius={2}
						transition={{
							type: 'decay',
						}}
					/>
				))}
			</View>
		</View>
	)
}
