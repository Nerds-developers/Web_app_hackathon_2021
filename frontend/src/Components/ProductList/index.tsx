import React from 'react'
import { createStyles, ListSubheader } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { IProduct } from '../../Data/api-types'
import ListItem from './ListItem'
import { IListProps } from './types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	gridList: {
		padding: '5px 20px',
		justifyContent: 'space-around',
	},
})

const ProductList = ({ data }: IListProps) => {
	const styles = useStyles()
	return (
		<GridList className={styles.gridList}>
			{data.map((tileData: IProduct, index: number) => (
				<ListItem data={tileData} key={String(index)} />
			))}
		</GridList>
	)
}

export default ProductList