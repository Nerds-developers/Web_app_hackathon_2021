import React, { useEffect, useMemo } from 'react'
import ApiClient from '../../Data/apiClient'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ProductList from '../../Components/ProductList'
import { AppBar, Box, CircularProgress, Divider, Grid, Tab, Tabs, Theme } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { useState } from 'react'
import {
	FilterConfigs,
	FilterParams,
	IProduct,
	ShopName,
	SortingParams,
} from '../../Data/api-types'
import Filters from '../../Components/Filters'
import selectShopProducts from '../../Data/Selectors/selectShopProducts'
import Sortings from '../../Components/Sortings'
import LoadingIndicator from '../../Components/LoadingIndicator'
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
			justifyContent: 'space-around',
		},
	})
)

export type MainPageProps = {
	apiClient: ApiClient
	filterConfigs: FilterConfigs
}

type DataState = { isLoaded: boolean; data: IProduct[] }

const dataInitialState: DataState = { isLoaded: false, data: [] }
const filterParamsInitialState: FilterParams = { selectedProducers: [], price: { min: 0, max: 0 } }

const MainPage = ({ apiClient, filterConfigs }: MainPageProps) => {
	const classes = useStyles()
	const [tab, setTab] = useState<'all' | ShopName>('all')
	const [{ isLoaded, data }, setData] = useState<DataState>(dataInitialState)
	const [filterParams, setFilterParams] = useState<FilterParams>(filterParamsInitialState)
	const [sortingParams, setSortParams] = useState<SortingParams>({})

	const productsByShop = useMemo(() => selectShopProducts(data, tab), [data, tab])

	const handleChange = (_: any, newValue: 'all' | ShopName) => setTab(newValue)
	const handleSortingChange = (params: SortingParams) => setSortParams(params)

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
			<AppBar position="static">
				<Tabs value={tab} onChange={handleChange} className={classes.tab} centered>
					<Tab label="Всі" value={'all'} />
					<Tab label="Novus" value={ShopName.NOVUS} />
					<Tab label="Ashan" value={ShopName.AUCHAN} />
					<Tab label="Metro" value={ShopName.METRO} />
				</Tabs>
			</AppBar>
			<Grid container className={classes.body}>
				<Grid item sm={1} xs={3} md={3}>
					<Filters
						configs={filterConfigs}
						onFilterSubmit={(filterParams) => setFilterParams(filterParams)}
					/>
				</Grid>
				<Divider orientation="vertical" flexItem />
				<Grid item xs={8} md={8} justify={'space-between'}>
					<Sortings onChange={handleSortingChange} sortingParams={sortingParams} />
					{isLoaded ? <ProductList data={productsByShop} /> : <LoadingIndicator />}
				</Grid>
			</Grid>
		</Container>
	)
}

export default MainPage
