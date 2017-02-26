import React from 'react'
import './MessageForm.scss'

class MessageForm extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			text: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		var message = {
			user: this.props.user
		}
	}

	render () {
		return (
			
		)
	}

}

MessageForm.propTypes = {
	user: React.PropTypes.string
}

export default user