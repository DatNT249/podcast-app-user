import { MovingText } from '@/libs/components/MovingText'
import { colors } from '@/libs/config/theme'
import { defaultStyles, textStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { EpisodeType } from '@/types/episode'
import { MaterialIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer from 'react-native-track-player'
import { FAVORITE_EPISODES_QUERY_KEY, useUnFavoriteEpisodeMutation } from '../hooks'

interface FavoriteBottomModalProps {
	episode?: EpisodeType
	bottomSheetRef: React.RefObject<BottomSheetModal>
	onClose: () => void
}

export const FavoriteBottomModal = ({
	episode,
	bottomSheetRef,
	onClose,
}: FavoriteBottomModalProps) => {
	const snapPoints = useMemo(() => ['50%', '50%'], [])
	const { mutate } = useUnFavoriteEpisodeMutation()
	const queryClient = useQueryClient()
	const { t } = useTranslation()

	const handleUnFavorite = () => {
		if (episode) {
			mutate(episode._id, {
				onSettled: async () => {
					onClose()
					queryClient.invalidateQueries({ queryKey: [FAVORITE_EPISODES_QUERY_KEY] })
					TrackPlayer
				},
			})
		}
	}

	if (!episode) {
		return null
	}

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			handleStyle={styles.handleModal}
			handleComponent={() => (
				<View style={styles.handleModalContainer}>
					<View style={styles.handleModalLine} />
					<View style={styles.container}>
						<FastImage
							source={{
								uri: episode.artwork ?? unknownTrackImageUri,
							}}
							style={styles.artworkImage}
						/>

						<View style={styles.trackTitleContainer}>
							<MovingText
								style={styles.trackTitle}
								text={episode.title ?? ''}
								animationThreshold={25}
							/>
							<Text style={styles.trackAuthor}>{episode.artist}</Text>
						</View>
					</View>
				</View>
			)}
		>
			<BottomSheetView
				style={{
					flex: 1,
					backgroundColor: colors.background,
					paddingVertical: 20,
					paddingHorizontal: 10,
				}}
			>
				<Pressable
					onPress={handleUnFavorite}
					style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
				>
					<MaterialIcons name="remove-circle-outline" size={24} color={colors.text} />
					<Text style={{ color: colors.text }}>{t('favorite.remove')}</Text>
				</Pressable>
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 3,
	},
	artworkImage: {
		width: 40,
		height: 40,
		borderRadius: 4,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...textStyles.text14,
		color: colors.text,
		fontWeight: '600',
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 10,
		marginRight: 12,
		paddingLeft: 12,
	},
	trackAuthor: {
		...defaultStyles.text,
		fontSize: 10,
		color: '#b3b3b3',
	},
	scrollContainer: {
		paddingBottom: 200,
	},
	main: {
		paddingHorizontal: 20,
		gap: 24,
	},
	handleModal: {
		backgroundColor: colors.modal,
		borderTopEndRadius: 12,
		borderTopStartRadius: 12,
		borderBottomWidth: 0,
	},
	title: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginBottom: 10,
	},
	handleModalContainer: {
		paddingHorizontal: 12,
		paddingVertical: 12,
		backgroundColor: colors.headerModal,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
		gap: 4,
		borderBottomColor: colors.border,
		borderBottomWidth: 1,
	},
	handleModalLine: {
		width: 40,
		height: 4,
		backgroundColor: colors.greyInactive,
		borderRadius: 12,
		margin: 'auto',
	},
})
