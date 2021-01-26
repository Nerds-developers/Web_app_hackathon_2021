import React from 'react'
import { Theme, Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { IProduct } from '../../Data/api-types'
import defaultImage from '../../Assets/default-image.jpg'
import { Box } from '@material-ui/core'
import ProductLink from './ProductLink'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		image: {
			width: 'auto',
			height: 'auto',
			maxWith: 450,
			maxHeight: 650,
			[theme.breakpoints.between(400, 600)]: {
				maxWith: '250px',
				maxHeight: '450px',
			},
			[theme.breakpoints.down(400)]: {
				maxHeight: '300px',
			},
		},
		priceContainer: {
			display: 'flex',
			justifyContent: 'center',
		},
		priceItem: {
			textAlign: 'center',
			marginRight: 20,
			marginLeft: 20,
		},
	})
)

export type ProductModalProps = {
	product: IProduct | null
	handleClose: () => void
}

const ProductModal = ({ product, handleClose }: ProductModalProps) => {
	const classes = useStyles()

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={product !== null}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={product !== null}>
					<div className={classes.paper}>
						<Box>
							<img
								src={product?.image_link || defaultImage}
								alt={product?.title}
								className={classes.image}
							/>
						</Box>
						<Box>
							<h2 id="transition-modal-title">Товар: {product?.title}</h2>
							<h3 id="transition-modal-title">Виробник: {product?.producer}</h3>
							<Box className={classes.priceContainer}>
								{product?.prices.map((price, index) => (
									<Box className={classes.priceItem}>
										<Typography>Ціна: {price} грн за кг.</Typography>
										<ProductLink link={product.links[index]}></ProductLink>
									</Box>
								))}
							</Box>
						</Box>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}

export default ProductModal
