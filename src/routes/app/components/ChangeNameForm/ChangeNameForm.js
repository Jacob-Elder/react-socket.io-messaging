import React from 'react'
import './ChangeNameForm.scss'

class ChangeNameForm extends React.Component {

	constuctor(props) {
		super(props)
		this.state = {
			newName: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateInput = this.updateInput.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		this.props.onChangeName(this.state.newName)
		this.setState({ newName: '' })
	}

	updateInput (e) {
		this.setState({ newName: e.target.value })
	}

	render () {
		return (
			<div className='change_name_form'>
				<h3>Change Name</h3>
				<form onSubmit={this.handleSubmit}
					<input
						onChange={this.updateInput}
						value={this.state.newName}
					/>
				</form>
			</div>
		)
	}

}

ChangeNameForm.propTypes = {
	onChangeName: React.PropTypes.func
}

export default ChangeNameForm