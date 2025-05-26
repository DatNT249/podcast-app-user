import { colors } from '@/libs/config/theme'
import { defaultStyles } from '@/libs/constants'
import { unknownTrackImageUri } from '@/libs/constants/images'
import { generateMediaUrl } from '@/libs/helpers/generateMediaUrl'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack } from 'react-native-track-player'

export type EpisodeItemProps = {
	episode: Track
	onTrackSelect: (episode: Track) => void
	style?: ViewProps
}

export const EpisodeItem = ({
	episode,
	onTrackSelect: handleTrackSelect,
	style,
}: EpisodeItemProps) => {
	const isActiveTrack = useActiveTrack()?.url === episode.url

	return (
		<TouchableOpacity onPress={() => handleTrackSelect(episode)}>
			<View style={[styles.container, style]}>
				<FastImage
					source={{
						uri: episode.artwork
							? generateMediaUrl(episode.artwork, 'image')
							: unknownTrackImageUri,
						priority: FastImage.priority.normal,
					}}
					style={styles.image}
				/>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<View
							style={{ flexDirection: 'row', flexWrap: 'nowrap', gap: 2, alignItems: 'center' }}
						>
							{isActiveTrack && (
								<LoaderKit
									style={styles.playingIcon}
									name="LineScaleParty"
									color={colors.primary}
								/>
							)}

							<Text
								numberOfLines={1}
								style={{
									...styles.nameEpisode,
									color: isActiveTrack ? colors.primary : colors.text,
								}}
							>
								{episode.title}
							</Text>
						</View>

						{episode.description && (
							<Text numberOfLines={1} style={styles.description}>
								{episode.description}
							</Text>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	playingIcon: {
		width: 16,
		height: 16,
	},
	pauseIcon: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
	image: {
		borderRadius: 2,
		width: 50,
		height: 50,
	},
	nameEpisode: {
		...defaultStyles.text,
		fontSize: 16,
		fontWeight: '600',
		maxWidth: '90%',
	},
	description: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
