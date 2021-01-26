import React, { useState } from 'react'
import ApiClient from '../../Data/apiClient'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ProductList from '../../Components/ProductList'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import {
	AppBar,
	Box,
	CssBaseline,
	Drawer,
	FormControlLabel,
	IconButton,
	Switch,
	Theme,
	Typography,
} from '@material-ui/core'
import { ApiData, FilterParams, IProduct, SortingParams } from '../../Data/api-types'
import Filters from '../../Components/Filters'
import Sortings from '../../Components/Sortings'
import LoadingIndicator from '../../Components/LoadingIndicator'
import MenuIcon from '@material-ui/icons/Menu'
import { Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Container } from '@material-ui/core'
import Pagination from '../../Components/Pagination'
import useDeepCompareEffect from 'use-deep-compare-effect'
import ProductModal from '../../Components/ProductModal'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		'root': {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			backgroundColor: theme.palette.background.paper,
			flexGrow: 1,
			padding: 0,
		},
		'tab': {
			color: 'white',
			paddingTop: 50,
		},
		'body': {
			display: 'flex',
			alignItems: 'flex-start',
			padding: '10px',
			width: '100%',
			paddingBottom: '20px',
			minHeight: '100vh',
		},
		'drawer': {
			flexShrink: 1,
			width: '330px',
			marginRight: '10px',
		},
		'appBar': {
			zIndex: theme.zIndex.drawer + 1,
			position: 'relative',
		},
		'menuButton': {
			marginRight: theme.spacing(2),
		},
		'toolbar': theme.mixins.toolbar,
		'drawerPaper': {
			position: 'relative',
			[theme.breakpoints.down('sm')]: {
				position: 'fixed',
			},
		},
		'content': {
			width: '100%',
		},
		'closeMenuButton': {
			marginRight: 'auto',
			marginLeft: 0,
		},
		'appBarContent': {
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: '10px',
		},
		'.MuiMenu-paper': {
			transactionDuration: '0s !important',
		},
	})
)

const apiInitialState: { isLoaded: boolean; products: IProduct[] } = {
	isLoaded: false,
	products: [],
}

export type MainPageProps = {
	apiClient: ApiClient
}

const MainPage = ({ apiClient }: MainPageProps) => {
	const classes = useStyles()

	const [{ isLoaded, products }, setApiResponse] = useState<typeof apiInitialState>(apiInitialState)
	const [filterParams, setFilterParams] = useState<FilterParams>()

	const [isFilterOpen, setFilterState] = useState(false)
	const [sortingParams, setSortParams] = useState<SortingParams>({ column: 'prices', order: 'asc' })
	const [page, setPage] = useState<number>(1)
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
	const [isProductionMode, setMode] = useState(false)

	const handleSortingChange = (params: SortingParams) => setSortParams(params)
	const handleDrawerToggle = () => setFilterState(!isFilterOpen)
	const handlePageChange = (page: number) => setPage(page)

	useDeepCompareEffect(() => {
		isLoaded && setApiResponse(apiInitialState)
		apiClient
			.fetchProducts({ sorting: sortingParams, filters: filterParams, page }, isProductionMode)
			.then(([products, filterParams]) => {
				setApiResponse({ isLoaded: true, products })
				setFilterParams(filterParams)
			})
			.catch((e) => console.error(e))
	}, [sortingParams, filterParams, page])

	return (
		<Container maxWidth="lg" className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Box className={classes.appBarContent}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Hackaton 2021
						</Typography>
					</Toolbar>
					<FormControlLabel
						control={
							<Switch
								checked={!isProductionMode}
								onChange={() => setMode(!isProductionMode)}
								name="mode"
							/>
						}
						label="АPI/Test"
					/>
					{/*<Button*/}
					{/*	startIcon={<EqualizerIcon />}*/}
					{/*	onClick={() => console.log('statistic')}*/}
					{/*	color="inherit"*/}
					{/*>*/}
					{/*	Статистика*/}
					{/*</Button>*/}
				</Box>
			</AppBar>
			<Box className={classes.body}>
				{isLoaded ? (
					<>
						<Box hidden={!isFilterOpen}>
							<Drawer
								classes={{
									paper: classes.drawerPaper,
								}}
								className={classes.drawer}
								variant="persistent"
								open={isFilterOpen}
							>
								<IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
									<CloseIcon />
								</IconButton>
								{
									<Filters
										filterParams={filterParams}
										onFilterSubmit={(filterParams) => setFilterParams(filterParams)}
									/>
								}
							</Drawer>
						</Box>
						<Box onClick={() => isFilterOpen && setFilterState(false)} className={classes.content}>
							<>
								<Sortings onChange={handleSortingChange} sortingParams={sortingParams} />
								<ProductList
									data={products}
									itemOnClick={(product: IProduct) => setSelectedProduct(product)}
								/>
								<Pagination
									page={page}
									onPageChange={handlePageChange}
									itemsCount={products.length}
								/>
							</>
						</Box>
					</>
				) : (
					<LoadingIndicator />
				)}
			</Box>

			<ProductModal product={selectedProduct} handleClose={() => setSelectedProduct(null)} />
		</Container>
	)
}

export default MainPage
