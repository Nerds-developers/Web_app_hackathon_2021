import React from 'react'
import MaterialPagination from '@material-ui/lab/Pagination'
const defaultItemOnPageCount = 10

export type PaginationProps = {
	itemsCount: number
	page: number
	onPageChange: (page: number) => void
}
const Pagination = ({ page, itemsCount, onPageChange }: PaginationProps) => {
	return (
		<MaterialPagination
			page={page}
			count={(itemsCount - 1) / defaultItemOnPageCount + 1}
			color="primary"
			onChange={(_: any, page: number) => onPageChange(page)}
		/>
	)
}

export default Pagination
