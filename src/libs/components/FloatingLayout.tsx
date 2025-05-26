import { FloatingPlayer } from '@/libs/components/FloatingPlayer'
import { Fragment } from 'react'
import { device } from '../constants'

interface FloatingLayoutProps {
	children: React.ReactNode
}

export const FloatingLayout = ({ children }: FloatingLayoutProps) => {
	return (
		<Fragment>
			{children}

			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: device.iOS ? 84 : 50,
					zIndex: 1,
				}}
			/>
		</Fragment>
	)
}
