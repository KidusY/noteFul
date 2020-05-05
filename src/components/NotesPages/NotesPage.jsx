import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import editIcon from '../../assets/hiclipart.com (58).png';
import './NotesPages-style.css';

const NotePage = (props) => {
	return (
		<div key={props.keys} className='notes'>
			{console.log(props)}
			<Link to={`/note/${props.note.id}`} className='info' style={{ textDecoration: 'none', color: 'black' }}>
				<div>
					<h2>{props.note.name} </h2>
					<div>Date modified on {props.note.modified}</div>
				</div>
			</Link>
			<div className='btn-Group'>
				<button
					className='btn-Edit'
					onClick={() => {
						props.getEditNoteInfo(props.note.name, props.note.id, props.note.content);
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
		addEditNotes: PropTypes.bool,
		deleteNote: PropTypes.func,
		getEditNoteInfo: PropTypes.func,
		note: PropTypes.shape({
			content: PropTypes.string,
			folderId: PropTypes.string,
			id: PropTypes.string,
			modified: PropTypes.string,
			name:PropTypes.string
		}),
		setAddFormVisible: PropTypes.func
	})
}

export default NotePage;
