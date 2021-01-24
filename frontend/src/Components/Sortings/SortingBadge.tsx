import React from 'react'
import { Box, Chip } from '@material-ui/core'
import SortingIcon from './SortingIcon'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

export type SortingBadgeProps = {
	isActive: boolean
	order?: 'asc' | 'desc'
	title: string
	handleClick: () => void
	handleReset: () => void
}

const SortingBadge = ({ isActive, order, title, handleClick, handleReset }: SortingBadgeProps) => {
	return (
		<Box>
			<Chip
				icon={<SortingIcon isActive={isActive} order={order} />}
				label={title}
				onClick={handleClick}
				onDelete={handleReset}
				color={isActive ? 'secondary' : undefined}
				clickable
				deleteIcon={isActive ? <HighlightOffIcon /> : <></>}
			/>
		</Box>
	)
}

export default SortingBadge
