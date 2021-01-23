import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	loadingIndicatorContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
})
const LoadingIndicator = () => {
	const classes = useStyles()

	return (
		<Box className={classes.loadingIndicatorContainer}>
			<CircularProgress color="secondary" />{' '}
		</Box>
	)
}

export default LoadingIndicator
