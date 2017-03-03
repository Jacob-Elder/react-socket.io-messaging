import React from 'react'
import './App.scss'
import UsersList from './UsersList/UsersList.js'
import MessageList from './MessageList/MessageList.js'
import MessageForm from './MessageForm/MessageForm.js'
import ChangeNameForm from './ChangeNameForm/ChangeNameForm.js'
import io from 'socket.io-client'
const socket = io.connect('10.0.1.3:3000')

class App extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			users: [],
			messages: [],
			text: ''
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this._messageRecieve = this._messageRecieve.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
	}

	componentDidMount () {
		socket.on('send:message', this._messageRecieve)
		socket.on('user:join', this._userJoined)
		socket.on('user:left', this._userLeft)
	}

	_messageRecieve (message) {
		console.log('messaged recieved');
		var {messages} = this.state
		messages.push(message)
		this.setState({messages})
	}

	_userJoined (data) {
		console.log('user joined!')
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

	handleMessageSubmit (message) {
		var {messages} = this.state
		messages.push(message)
		this.setState({messages})
		socket.emit('send:message', message)
		console.log('message sent' + message)
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
