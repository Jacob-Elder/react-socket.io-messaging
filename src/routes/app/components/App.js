import React from 'react'
import './App.scss'
import UsersList from './UsersList/UsersList.js'
import MessageList from './MessageList/MessageList.js'
import MessageForm from './MessageForm/MessageForm.js'
import ChangeNameForm from './ChangeNameForm/ChangeNameForm.js'
const io = require('socket.io-client')
const socket = io()

class App extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			users: [],
			messages: [],
			text: ''
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this._initialize = this._initialize.bind(this)
		this._messageRecieve = this._messageRecieve.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this._userChangedName = this._userChangedName.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.handleChangeName = this.handleChangeName.bind(this)
	}

	componentDidMount () {
		socket.on('init', this._initialize)
		socket.on('send:message', this._messageRecieve)
		socket.on('user:join', this._userJoined)
		socket.on('user:left', this._userLeft)
		socket.on('change:name', this._userChangedName)
	}

	_initialize (data) {
		var {users, name} = data
		this.setState({ users, user: name })
	}

	_messageRecieve (message) {
		var {messages} = this.state
		messages.push(message)
		this.setState({messages})
	}

	_userJoined (data) {
		var {users, messages} = this.state
		var {name} = data
		users.push(name)
		messages.push({
			user: 'Bot',
			text: name + ' Joined!'
		})
		this.setState({users, messages})
	}

	_userLeft (data) {
		var {users, messages} = this.state
		var {name} = data
		var index = users.indexOf(name)
		users.splice(index, 1)
		messages.push({
			user: 'Bot',
			text: name + ' Left!'
		})
		this.setState({users, messages})
	}

	_userChangedName (data) {
		var {oldName, newName} = data
		var {users, messages} = this.state
		var index = users.indexOf(oldName)
		users.splice(index, 1, newName)
		messages.push({
			user: 'Bot',
			text: oldName + " changed they're name to " + newName
		})
		this.setState({users, messages})
	}

	handleMessageSubmit (message) {
		var {messages} = this.state
		messages.push(message)
		this.setState({messages})
		socket.emit('send:message', message)
	}

	handleChangeName (newName) {
		var oldName = this.state.user
		socket.emit('change:name', { name : newName}, (result) => {
			if(!result) {
				return alert("There was an error while changing your name")
			}
			var {users} = this.state
			var index = users.indexOf(oldName)
			users.splice(index, 1, newName)
			this.setState({users, user: newName})
		})
	}

	render () {
		return (
			<div>
				<UsersList
					users={this.state.users}
				/>
				<MessageList
					messages={this.state.messages}
				/>
				<MessageForm
					onMessageSubmit={this.handleMessageSubmit}
					user={this.state.user}
				/>
				<ChangeNameForm
					onChangeName={this.handleChangeName}
				/>
			</div>
		)
	}

}

export default App
