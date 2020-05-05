import React from 'react';
import { Link } from 'react-router-dom';
import ink from '../../assets/hiclipart.com (55).png';
import add from '../../assets/hiclipart.com (56).png';
import AddNoteForm from '../AddNotesForm/AddNotesForm';
import './header-style.css';
import NoteContext from '../../noteContext';
const Header = () => (
	<NoteContext.Consumer>
		{

		context=>
	<header>
	
		<Link to='/' style={{ textDecoration: 'none' }}>
			<span style={{ display: 'flex', width: '100%' }}>
				<h1>NoteFul</h1> <img src={ink} alt='ink' />
			</span>
		</Link>
		<div
			className='addSign'
			style={{ float: 'right', marginTop: '50px' }}
					onClick={() => {
						
						context.setAddFormVisible('addFromNotes')
					}}
		>
			<img src={add} alt='add' />
		</div>

		{context.addNoteForm && <AddNoteForm/>}
	</header>
		}
	</NoteContext.Consumer>
);



export default Header;
