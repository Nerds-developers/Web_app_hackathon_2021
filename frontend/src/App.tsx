import React from 'react'
import MainPage from './Pages/MainPage'
import ApiClient from './Data/apiClient'
import { SERVER_URL } from './constants'

const apiClient = new ApiClient(SERVER_URL)

function App() {
	return (
		<div>
			<MainPage apiClient={apiClient} />
		</div>
	)
}

export default App
