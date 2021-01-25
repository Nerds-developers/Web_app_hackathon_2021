import React, { useState } from 'react'
import ApiClient from '../../Data/apiClient'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ProductList from '../../Components/ProductList'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import {
	AppBar,
	Box,
	Button,
	CssBaseline,
	Drawer,
	IconButton,
	Theme,
	Typography,
} from '@material-ui/core'
import { ApiData, FilterParams, SortingParams } from '../../Data/api-types'
import Filters from '../../Components/Filters'
import Sortings from '../../Components/Sortings'
import LoadingIndicator from '../../Components/LoadingIndicator'
import MenuIcon from '@material-ui/icons/Menu'
import { Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Container } from '@material-ui/core'
import Pagination from '../../Components/Pagination'
import useDeepCompareEffect from 'use-deep-compare-effect'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			flexGrow: 1,
			padding: 0,
			height: '100vh',
		},
		tab: {
			color: 'white',
			paddingTop: 50,
		},
		body: {
			height: '100vh',
			display: 'flex',
			alignItems: 'flex-start',
			overflowY: 'auto',
			padding: '10px',
			width: '100%',
		},
		drawer: {
			flexShrink: 1,
			width: '330px',
			marginRight: '10px',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			position: 'relative',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			position: 'relative',
			[theme.breakpoints.down('sm')]: {
				position: 'fixed',
			},
		},
		content: {
			width: '100%',
		},
		closeMenuButton: {
			marginRight: 'auto',
			marginLeft: 0,
		},
		appBarContent: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: '10px',
		},
	})
)

type ApiResponseInitialState = { isLoaded: boolean; apiData: ApiData }

const apiInitialState: ApiResponseInitialState = {
	isLoaded: false,
	apiData: { products: [], producers: [], minPrice: 0, maxPrice: 0 },
}
const buildDefaultStateForFilter = ({ minPrice, maxPrice, producers }: ApiData): FilterParams => ({
	producers,
	maxPrice,
	minPrice,
})

export type MainPageProps = {
	apiClient: ApiClient
}

const MainPage = ({ apiClient }: MainPageProps) => {
	const classes = useStyles()

	const [{ isLoaded, apiData }, setApiResponse] = useState<ApiResponseInitialState>(apiInitialState)
	const [filterParams, setFilterParams] = useState<FilterParams | null>(null)

	const [isFilterOpen, setFilterState] = useState(false)
	const [sortingParams, setSortParams] = useState<SortingParams>({ column: 'price', order: 'asc' })
	const [page, setPage] = useState<number>(1)

	const handleSortingChange = (params: SortingParams) => setSortParams(params)
	const handleDrawerToggle = () => setFilterState(!isFilterOpen)
	const handlePageChange = (page: number) => setPage(page)

	useDeepCompareEffect(() => {
		isLoaded && setApiResponse(apiInitialState)
		apiClient
			.fetchProducts({ sorting: sortingParams, filters: filterParams, page })
			.then((data: ApiData) => {
				setApiResponse({ isLoaded: true, apiData: data })
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
					<Button
						startIcon={<EqualizerIcon />}
						onClick={() => console.log('statistic')}
						color="inherit"
					>
						Статистика
					</Button>
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
										configs={buildDefaultStateForFilter(apiData)}
										onFilterSubmit={(filterParams) => setFilterParams(filterParams)}
									/>
								}
							</Drawer>
						</Box>
						<Box onClick={() => isFilterOpen && setFilterState(false)} className={classes.content}>
							<>
								<Sortings onChange={handleSortingChange} sortingParams={sortingParams} />
								<ProductList data={apiData.products} />
								<Pagination
									page={page}
									onPageChange={handlePageChange}
									itemsCount={apiData.products.length}
								/>
							</>
						</Box>
					</>
				) : (
					<LoadingIndicator />
				)}
			</Box>
		</Container>
	)
}

export default MainPage
