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
	Grid,
	Hidden,
	IconButton,
	Theme,
	Typography,
} from '@material-ui/core'
import { FilterConfigs, FilterParams, IProduct, SortingParams } from '../../Data/api-types'
import Filters from '../../Components/Filters'
import Sortings from '../../Components/Sortings'
import LoadingIndicator from '../../Components/LoadingIndicator'
import useDeepCompareEffect from 'use-deep-compare-effect'
import MenuIcon from '@material-ui/icons/Menu'
import { Toolbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Container } from '@material-ui/core'

const drawerWidth = 240

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
		},
		drawer: {
			flexShrink: 1,
			width: '330px',
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
			display: 'flex',
			justifyContent: 'center',
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

type DataState = { isLoaded: boolean; data: IProduct[] }

const dataInitialState: DataState = { isLoaded: false, data: [] }
const filterParamsInitialState: FilterParams = { selectedProducers: [], price: { min: 0, max: 0 } }

export type MainPageProps = {
	apiClient: ApiClient
	filterConfigs: FilterConfigs
}

const MainPage = ({ apiClient, filterConfigs }: MainPageProps) => {
	const classes = useStyles()

	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [{ isLoaded, data }, setData] = useState<DataState>(dataInitialState)
	const [filterParams, setFilterParams] = useState<FilterParams>(filterParamsInitialState)
	const [sortingParams, setSortParams] = useState<SortingParams>({})

	const handleSortingChange = (params: SortingParams) => setSortParams(params)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	useDeepCompareEffect(() => {
		setData({ isLoaded: false, data: [] })
		apiClient
			.fetchProducts({ sorting: sortingParams, filters: filterParams })
			.then((data: IProduct[]) => {
				setData({ isLoaded: true, data: data })
			})
	}, [sortingParams, filterParams])

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
				<Box hidden={!mobileOpen}>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						className={classes.drawer}
						variant="persistent"
						open={mobileOpen}
					>
						<IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
							<CloseIcon />
						</IconButton>
						{
							<Filters
								configs={filterConfigs}
								onFilterSubmit={(filterParams) => setFilterParams(filterParams)}
							/>
						}
					</Drawer>
				</Box>
				<Box onClick={() => mobileOpen && setMobileOpen(false)}>
					<Sortings onChange={handleSortingChange} sortingParams={sortingParams} />
					{isLoaded ? <ProductList data={data} /> : <LoadingIndicator />}
				</Box>
			</Box>
		</Container>
	)
}

export default MainPage
