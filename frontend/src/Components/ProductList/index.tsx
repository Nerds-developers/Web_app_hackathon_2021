import React from 'react'
import GridList from '@material-ui/core/GridList'
import { IProduct } from '../../Data/api-types'
import ListItem from './ListItem'
import { IListProps } from './types'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => {
	return {
		gridList: {
			padding: '5px 20px',
			justifyContent: 'flex-start',
			[theme.breakpoints.down(600)]: {
				justifyContent: 'center',
			},
		},
	}
})

const ProductList = ({ data, itemOnClick }: IListProps) => {
	const styles = useStyles()
	return (
		<GridList className={styles.gridList}>
			{data.map((tileData: IProduct, index: number) => (
				<ListItem data={tileData} key={String(index)} itemOnClick={itemOnClick} />
			))}
		</GridList>
	)
}

export default ProductList
