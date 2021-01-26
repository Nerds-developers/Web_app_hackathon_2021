import React from 'react'
import { IconButton, GridListTileBar, GridListTile } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { IListItemProps } from './types'
import { makeStyles } from '@material-ui/core/styles'
import defaultImage from '../../Assets/default-image.jpg'

const useStyles = makeStyles({
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	image: {
		width: 290,
		height: 235,
	},
	tile: {
		padding: 5,
	},
})

const ListItem = ({ key, data, itemOnClick }: IListItemProps) => {
	const styles = useStyles()
	return (
		<GridListTile className={styles.tile} key={String(key)} onClick={() => itemOnClick(data)}>
			<img src={data.image_link || defaultImage} alt={data.title} className={styles.image} />
			<GridListTileBar
				title={data.title}
				subtitle={<span>Виробник: {data.producer}</span>}
				actionIcon={
					<IconButton aria-label={`info about ${data.title}`} className={styles.icon}>
						<InfoIcon />
					</IconButton>
				}
			/>
		</GridListTile>
	)
}

export default ListItem
