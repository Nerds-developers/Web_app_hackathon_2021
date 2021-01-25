import React from 'react'
import MainPage from './Pages/MainPage'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'
import ApiClient from './Data/apiClient'

const apiClient = new ApiClient()

function App() {
	return (
		<div>
			<MainPage apiClient={apiClient} />
		</div>
	)
}

export default App
