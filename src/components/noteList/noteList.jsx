import React from 'react';
import NoteContext from '../../noteContext';
import ErrorBoundary from '../../errorBoundary/errorBoundary';
import SideBar from '../sideBar/sideBar';
import PropTypes from 'prop-types';
import './noteList-style.css';
import AddFolder from '../AddFolderFrom/AddFolder';

const NoteList = (props) => (
	<ErrorBoundary>
		
		<NoteContext.Consumer>
			{(context) => (
				<div className='container'>
					<div className='folders'>
						{context.store.folders.map((folder, i) => {
							return <SideBar folder={folder} key={i} link={props.match.params.id} />;
						})}
						<div className='btn-addFolder' onClick={() => context.setAddFormVisible('addForm')}>
							<h2>Add Folder</h2>
						</div>
						{context.addForm && <AddFolder setAddFormVisible={context.setAddFormVisible} />}
					</div>
					<div className='notesList'>{context.displayNotes(context, props)}</div>
				</div>
			)}
		</NoteContext.Consumer>
	</ErrorBoundary>
);

NoteList.propTypes = {
	history: PropTypes.object,
	location:PropTypes.object,
	match:PropTypes.object
 }


export default NoteList;
