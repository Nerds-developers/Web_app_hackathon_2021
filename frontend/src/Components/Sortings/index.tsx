import { Box, Chip, Typography } from '@material-ui/core'
import React from 'react'
import SortingBadge from './SortingBadge'
import { makeStyles } from '@material-ui/core/styles'
import { SortingParams } from '../../Data/api-types'

export type SortingProps = {
	onChange: (sorting: SortingParams) => void
	sortingParams: SortingParams
}

const useStyles = makeStyles({
	root: {
		'marginTop': '10px',
		'marginRight': '20px',
		'display': 'flex',
		'justifyContent': 'flex-end',
		'alignItems': 'center',

		'& .MuiChip-root': {
			marginLeft: '10px',
		},
	},
})

const Sortings = ({ sortingParams, onChange }: SortingProps) => {
	const classes = useStyles()

	const handleClick = (column: string, order: 'asc' | 'desc') => {
		onChange({ column, order })
	}

	return (
		<Box className={classes.root}>
			<Typography>Сортування: </Typography>
			<SortingBadge
				order={sortingParams.order}
				isActive={sortingParams.column === 'price'}
				title={'За ціною'}
				handleClick={handleClick.bind(
					null,
					'price',
					sortingParams.order === 'asc' ? 'desc' : 'asc'
				)}
			/>
			<SortingBadge
				order={sortingParams.order}
				isActive={sortingParams.column === 'name'}
				title={'За назвою'}
				handleClick={handleClick.bind(null, 'name', sortingParams.order === 'asc' ? 'desc' : 'asc')}
			/>
		</Box>
	)
}

export default Sortings
