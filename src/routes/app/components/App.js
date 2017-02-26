import React from 'react'
import './App.scss'
import UsersList from './UsersList/UsersList.js'

class App extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			users: [],
			messages: [],
			text: ''
		}
	}

	render () {
		return (
			<h1>App main Component!!!!</h1>
		)
	}

}

export default App
