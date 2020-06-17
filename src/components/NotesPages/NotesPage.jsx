import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import editIcon from '../../assets/hiclipart.com (58).png';
import './NotesPages-style.css';

const NotePage = (props) => {
	return (
		<div key={props.keys} className='notes'>
		
		
			<Link to={`/note/${props.note.id}`} className='info' style={{ textDecoration: 'none', color: 'black' }}>
				<div>
			
					<h2>{props.note.title} </h2>
					<div>Date modified on {new Date(props.note.modified).toDateString() }</div>
				</div>
			</Link>
			<div className='btn-Group'>
				<button
					className='btn-Edit'
					onClick={() => {
						props.getEditNoteInfo(props.note.title, props.note.id, props.note.note);
						props.setAddFormVisible('addEditNotes');
					}}
				>
					<img src={editIcon} alt='editIcon' />
				</button>
				<button className='btn-Delete' onClick={() => props.deleteNote(props.note.id)}>
					Delete Notes
				</button>
			</div>
		</div>
	);
};

NotePage.propTypes = {
	props: PropTypes.shape({
		addEditNotes: PropTypes.bool.isRequired,
		deleteNote: PropTypes.func.isRequired,
		getEditNoteInfo: PropTypes.func.isRequired,
		note: PropTypes.shape({
			note: PropTypes.string.isRequired,
			folder: PropTypes.string,
			id: PropTypes.string.isRequired,
			modified: PropTypes.string.isRequired,
			title:PropTypes.string.isRequired,
			date_published:PropTypes.string.isRequired
		}),
		setAddFormVisible: PropTypes.func
	})
}

export default NotePage;
