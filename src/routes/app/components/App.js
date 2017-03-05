import React from 'react'
import './App.scss'
import UsersList from './UsersList/UsersList.js'
import MessageList from './MessageList/MessageList.js'
import MessageForm from './MessageForm/MessageForm.js'
import PickUsername from './PickUsername/PickUsername.js'
import io from 'socket.io-client'
const socket = io.connect('10.0.1.3:3000')
var messageList;

class App extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			username: '',
			signedIn: false,
			users: [],
			messages: [],
			text: ''
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this._messageRecieve = this._messageRecieve.bind(this)
		this._userJoined = this._userJoined.bind(this)
		this._userLeft = this._userLeft.bind(this)
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
		this.submitUsername = this.submitUsername.bind(this)
	}

	componentDidMount () {
		socket.on('send:message', this._messageRecieve)
		socket.on('user:join', this._userJoined)
		socket.on('user:left', this._userLeft)
	}

	submitUsername (name) {
		this.setState({
			username: name,
			signedIn: true
		})
		socket.emit('user:join', name)
	}

	_messageRecieve (message) {
		console.log('messaged recieved');
		var {messages} = this.state
		messages.push(message)
		this.setState({messages})
	}

	_userJoined (name, users) {
		this.setState({users: users})
		console.log(name + ' joined')
		this.state.messages.push({
			user: 'BOT',
			text: name + ' joined'
		})
	}

	_userLeft (data) {
		console.log('user left')
		socket.emit('send:message', {
			user: 'BOT',
			text: data.name + ' left'
		})
		this.setState({
			users: data.users
		})
	}

	handleMessageSubmit (message) {
		socket.emit('send:message', message)
		console.log('message sent' + message)
		messageList = document.getElementsByClassName('message-list')
		messageList.scrollTop = messageList.scrollHeight;
	}

	render () {
		if (this.state.signedIn) {
			return (
				<div className='app-div'>
					<UsersList
						users={this.state.users}
					/>
					<MessageList
						className='message-list'
						messages={this.state.messages}
					/>
					<MessageForm
						onMessageSubmit={this.handleMessageSubmit}
						user={this.state.username}
					/>
				</div>
			)
		} else {
			return (
				<PickUsername
					submitUsername={this.submitUsername}
				/>
			)
		}
	}

}

export default App
