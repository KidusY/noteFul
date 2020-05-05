import React from 'react';
import './AddFolder-style.css';
import Validation from '../../validation/validation';
import NoteContext from '../../noteContext';

class AddFolder extends React.Component {
	constructor () {
		super();
		this.state = {
			renderError  : false,
			errorMessage : ''
		};
	}

	render () {
		return (
			<NoteContext.Consumer>
				{(context) => (
					<form
						className='addFolder'
						onSubmit={() => {
							context.addFolder(document.querySelector('#addFolder').value);
							context.setAddFormVisible('addForm');
						}}
						onChange={() => {
							const error = Validation.folderNaming(document.querySelector('#addFolder').value);
							this.setState({ renderError: error.error, errorMessage: error.errorMessage });
							console.log(this.state.renderError);
						}}
					>
						<div style={{ float: 'right' }} onClick={() => context.setAddFormVisible('addForm')}>
							<strong style={{ cursor: 'pointer', fontSize: '25px' }}>X</strong>
						</div>
						<div className='error'>{this.state.errorMessage}</div>
						<input placeholder='Add Name' id='addFolder' required />
						<input
							type='submit'
							className='btn-AddFolder'
							value='Add Folder'
							disabled={this.state.renderError}
						/>
					</form>
				)}
			</NoteContext.Consumer>
		);
	}
}

export default AddFolder;
