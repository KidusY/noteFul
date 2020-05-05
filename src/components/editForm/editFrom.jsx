import React from 'react';
import NoteContext from '../../noteContext';
import './editFrom-style.css';

const EditFrom = (props) => {
	return (
		<NoteContext.Consumer>
			{(context) => (
				<form
					className='editNotes'
					onSubmit={(e) => {
						e.preventDefault();
						context.editNote(document.querySelector('#notesAdded').value, props.noteId);

						context.setAddFormVisible('addEditNotes');
					}}
				>
					<input id='noteTitle' defaultValue={props.name} />
					<textarea id='notesAdded' defaultValue={props.noteContent} required />
					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<input type='submit' className='btn-save' value='Save' />

						<button id='btn-cancel' onClick={() => context.setAddFormVisible('addEditNotes')}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</NoteContext.Consumer>
	);
};

export default EditFrom;
