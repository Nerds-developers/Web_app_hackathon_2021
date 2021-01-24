import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

type SortingIconProps = {
	isActive: boolean
	order: 'asc' | 'desc' | undefined
}

const SortingIcon = ({ isActive, order }: SortingIconProps) => {
	if (!isActive) {
		return <></>
	}

	return order === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
}

export default SortingIcon
