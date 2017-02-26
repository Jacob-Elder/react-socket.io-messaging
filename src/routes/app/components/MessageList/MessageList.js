import React from 'react'
import './MessageList.scss'

class MessageList extends React.Component{
	render () {
		return (
			<div className='messages'>
				<h2>Coversation: </h2>
				{
					this.props.messages.map(function (message, i) {
						return (
							<Message 
								key={i}
								user={message.user}
								text={message.text}
							/>
						)
					})
				}
			</div>
		)
	}
}

MessageList.propTypes = {
	messages: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default MessageList