import React from 'react'
import MaterialPagination from '@material-ui/lab/Pagination'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PRODUCT_PER_PAGE } from '../../constants'

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
	},
})

export type PaginationProps = {
	itemsCount: number
	page: number
	onPageChange: (page: number) => void
}
const Pagination = ({ page, itemsCount, onPageChange }: PaginationProps) => {
	const classes = useStyles()

	return (
		<Box className={classes.container}>
			<MaterialPagination
				page={page}
				count={Math.round((itemsCount - 1) / PRODUCT_PER_PAGE + 1)}
				color="primary"
				onChange={(_: any, page: number) => onPageChange(page)}
			/>
		</Box>
	)
}

export default Pagination
