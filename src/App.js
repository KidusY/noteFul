import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from './errorBoundary/errorBoundary';
import Note from './components/Note/Note';
import NotePages from './components/NotesPages/NotesPage';
import NoteContext from './noteContext';
import NotesList from './components/noteList/noteList';
import Header from './components/Header/header';
import EditFrom from './components/editForm/editFrom';
import Url from './config';
import './App.css';

const url = Url.url;
class App extends React.Component {
	constructor () {
		super();
		this.state = {
			store         : {
				folders : [],
				notes   : []
			},
			addFolderForm : false,
			addNoteForm   : false,
			addEditNotes  : false,
			noteId        : '',
			folderId      : '',
			noteInfo      : {},
			noteName      : 'Untitled',
			folderName    : 'Untitled'
		};
	}
	//get note data
	componentDidMount () {
		const noteStoreTemp = { folders: [], notes: [] };
		fetch(`${url}/folders`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				else {
					throw new Error('No file found');
				}
			})
			.then((res) => {				
				noteStoreTemp.folders = res;
				this.setState({ store: noteStoreTemp });
			})
			.catch((err) => console.log('Folder', err));
		fetch(`${url}/notes`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				else {
					throw new Error('No file found');
				}
			})
			.then((res) => {
				noteStoreTemp.notes = res;
				this.setState({ store: noteStoreTemp});
			})
			.catch((err) => console.log('notes', err));
	}

	//gets the current time and date
	date = () => {
		const tempDate = new Date();
		const date =
			tempDate.getFullYear() +
			'-' +
			(tempDate.getMonth() + 1) +
			'-' +
			tempDate.getDate() +
			' ' +
			tempDate.getHours() +
			':' +
			tempDate.getMinutes() +
			':' +
			tempDate.getSeconds();

		return date;
	};
	//filters the note that belong in the specified folder upon clicking
	displayNotes = (context, props) => {
		let NewNotes =  context.store.notes
		
		//console.log(context);
		//if there is an id available
		if (props.match.params.id) {

			NewNotes = NewNotes.filter((note) => note.folders === Number(props.match.params.id));
		}
		console.log(NewNotes);
		return (
			<div>
				{NewNotes.map((note, i) => (
					<NotePages
						note={note}
						key={i}
						deleteNote={this.deleteNote}
						setAddFormVisible={this.setAddFormVisible}
						addEditNotes={this.state.addEditNotes}
						getEditNoteInfo={this.getEditNoteInfo}
					/>
				))}
			</div>
		);
	};

	//add note function
	addNotes = (folderName, Note, noteName) => {
		

		const noteObj = {			
			title     : noteName,
			modified : this.date(),
			folders : Number(folderName),
			note : Note
		};
		const { notes } = this.state.store;
		const { store } = this.state;
		const newNotes = [
			...notes,
			noteObj
		];
		store.notes = newNotes;
		this.setState({ store: store, noteId: `${this.state.noteId}1` });
		fetch(`${url}notes`, {
			method  : 'POST',
			body    : JSON.stringify(noteObj),
			headers : {
				'content-type' : 'application/json'
			}
		});
	};

	//sets the visibility for different form
	setAddFormVisible = (Form) => {
		if (Form === 'addForm') {
			this.setState({ addFolderForm: !this.state.addFolderForm });
		}
		else if (Form === 'addFromNotes') {
			this.setState({ addNoteForm: !this.state.addNoteForm });
		}
		else if (Form === 'addEditNotes') {
			this.setState({ addEditNotes: !this.state.addEditNotes });
		}
	};
	//add folders
	addFolder = (name) => {
		const folderObj = {
			id   : `${this.state.folderId}2`,
			title : name
		};
		const { folders } = this.state.store;
		const { store } = this.state;
		const newFolder = [
			...folders,
			folderObj
		];
		store.folders = newFolder;
		this.setState({ store: store, folderId: `${this.state.folderId}2` });
		fetch(`${url}folders`, {
			method  : 'POST',
			body    : JSON.stringify(folderObj),
			headers : {
				'content-type' : 'application/json'
			}
		});
	};
	//delete note
	deleteNote = (noteId) => {
		const { notes } = this.state.store;
		const { store } = this.state;
		const newNotes = notes.filter((note) => note.id !== noteId);

		store.notes = newNotes;
		this.setState({ store: store });
		fetch(`${url}notes/${noteId}`, {
			method  : 'DELETE',
			headers : {
				'content-type' : 'application/json'
			}
		}).then((res) => console.log(res));
	};
	//gets the info needed for editing notes from  the NotePages component
	getEditNoteInfo = (name, id, content) => {
		const NoteContent = { Name: name, Id: id, Content: content };
		this.setState({ noteInfo: NoteContent });
	};

	//edit notes
	editNote = (noteContent, id) => {
		const { store } = this.state;

		const noteEdited = this.state.store.notes.map((note) => {
			if (note.id === id) {
				note.content = noteContent;
				return note;
			}
			return note;
		});
		store.notes = noteEdited;
		this.setState({ store: store });
	};

	render () {
		const value = {
			store             : this.state.store,
			displayNotes      : this.displayNotes,
			addForm           : this.state.addFolderForm,
			addNotes          : this.addNotes,
			setAddFormVisible : this.setAddFormVisible,
			addFolder         : this.addFolder,
			addNoteForm       : this.state.addNoteForm,
			deleteNote        : this.deleteNote,
			addEditNotes      : this.state.addEditNotes,
			editNote          : this.editNote,
			getEditNoteInfo   : this.getEditNoteInfo,
			NoteName          : this.state.noteName,
			folderName        : this.state.folderName
		};

		return (
			<NoteContext.Provider value={value}>
				<ErrorBoundary>
					<div className='App'>
						<Header />
						<section>
							<Switch>
								{/*Home page */}
								<Route exact path='/' component={(props) => <NotesList {...props} />} />
								{/*other pages */}
								<Route exact path='/:id' component={(props) => <NotesList {...props} />} />
								{/*displays the notes */}
								<Route exact path='/note/:id' component={(props) => <Note {...props} />} />
							</Switch>
						</section>
						{this.state.addEditNotes && (
							<EditFrom
								name={this.state.noteInfo.Name}
								noteId={this.state.noteInfo.Id}
								noteContent={this.state.noteInfo.Content}
							/>
						)}
					</div>
				</ErrorBoundary>
			</NoteContext.Provider>
		);
	}
}

export default App;
