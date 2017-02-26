import React from 'react'
import './MessageForm.scss'

class MessageForm extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			text: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateInput = this.updateInput.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		var message = {
			user: this.props.user,
			text: this.state.text
		}
		this.props.onMessageSubmit(message)
		this.setState({ text: '' })
	}

	updateInput (e) {
		this.setState({ text: e.target.value })
	}

	render () {
		return (
			<div className='message_form'>
				<h3>Write New Message</h3>
				<form onSubmit={this.handleSubmit}>
					<input
						onChange={this.updateInput}
						value={this.state.text}
					/>
				</form>
			</div>
		)
	}

}

MessageForm.propTypes = {
	user: React.PropTypes.string,
	onMessageSubmit: React.PropTypes.func
}

export default MessageForm