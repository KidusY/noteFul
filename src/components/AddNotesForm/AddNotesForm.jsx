import React from 'react';
import './AddNote-style.css';
import NoteContext from '../../noteContext';
import Validation from '../../validation/validation';
import ErrorBoundary from '../../errorBoundary/errorBoundary';

class AddNoteForm extends React.Component {
	constructor () {
		super();
		this.state = {
			renderError  : false,
			errorMessage : ''
		};
	}
	render() {	
		return (
			<ErrorBoundary>
				<NoteContext.Consumer>
					{(context) => (
						<form
							className='add-folderForm'
							onSubmit={(e) => {
								e.preventDefault();
								const folderId = document.querySelector('#folderSelection').value;
								const Note = document.querySelector('#notesAdded').value;
								const noteName = document.querySelector('.input-addFrom').value;
								context.addNotes(folderId, Note, noteName);
								context.setAddFormVisible('addFromNotes');
								
							}}
							onChange={() => {
								const Note = document.querySelector('#notesAdded').value;
								const noteName = document.querySelector('.input-addFrom').value;
								const error = Validation.NoteValidation(noteName, Note);
								this.setState({ renderError: error.error, errorMessage: error.errorMessage });
								
							}}
						>
							
							{this.state.renderError && <div className='errorNotes'> {this.state.errorMessage} </div>}
							<input className='input-addFrom' defaultValue={context.NoteName} />
							<textarea placeholder='Add Notes' id='notesAdded' required />
									
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<select name='folderSelection' id='folderSelection' required>
									{context.store.folders.map((folder, i) => (
										<option key={i} value={folder.id}>
											{folder.name}
										</option>
									))}
								</select>
							</div>
							<div className='addNotes-btns'>
								<input
									type='submit'
									className='btn-save'
									value='Save'
									disabled={this.state.renderError}
								/>

								<button
									className='btn-Cancel'
									onClick={() => context.setAddFormVisible('addFromNotes')}
								>
									Cancel
								</button>
							</div>
						</form>
					)}
				</NoteContext.Consumer>
			</ErrorBoundary>
		);
	}
}




export default AddNoteForm;
