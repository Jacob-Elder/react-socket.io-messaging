import React from 'react'
import './Message.scss'

class Message extends React.Component{

	render () {
		return (
			<div className='message'>
				<strong>{this.props.user} : </strong>
				<span>{this.props.text}</span>
			</div>
		)
	}

}

Message.propTypes = {
	user: React.PropTypes.string,
	text: React.PropTypes.string
}

export default Message