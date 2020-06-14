import React from 'react';
import NoteContext from '../../noteContext';
import editIcon from '../../assets/hiclipart.com (58).png';
import './Note-style.css';
import PropTypes from 'prop-types';

const Note = (props) => (
	<NoteContext.Consumer>
		{(context) => {			
			const note = context.store.notes.find((note) => note.id === Number(props.match.params.id));			
			if (!note) {				
				props.history.push('/');
				return <div />;
			}
			else {
				return (
					<div className='container'>
					
						<div className='btn-back' onClick={() => props.history.goBack()}>
							<h2>Back</h2>
						</div>

						<div className='notesHeader'>
							<div className='notesInfo'>
								<div>
									<h2>{note.title} </h2>
									Date modified on {note.modified}
								</div>
								<div>
									<button
										className='btn-Edit'
										onClick={() => {
											context.getEditNoteInfo(note.name, note.id, note.content);
											context.setAddFormVisible('addEditNotes');
										}}
									>
										<img src={editIcon} alt='editIcon' />
									</button>
									<button
										className='btn-Delete'
										onClick={() => {
											context.deleteNote(note.id);
										}}
									>
										Delete
									</button>
								</div>
							</div>
							<p style={{ margin: '10px 200px', fontSize: '20px' }}>{note.note}</p>
						</div>
					</div>
				);
			}
		}}
	</NoteContext.Consumer>
);
Note.propTypes = {
	history: PropTypes.object,
	location:PropTypes.object,
	match:PropTypes.object
 }
export default Note;
