function folderNaming (folderName){
	let ErrorMessage = {
		error        : false,
		errorMessage : ''
	};

	if (folderName.length > 10) {
		ErrorMessage.error = true;
		ErrorMessage.errorMessage = 'Please enter less than 10 characters';
	}
	else if (folderName.length === 0) {
		ErrorMessage.error = true;
		ErrorMessage.errorMessage = 'Can not be empty';
	}
	return ErrorMessage;
}

function NoteValidation (Title, content){
	let ErrorMessage = {
		error        : false,
		errorMessage : ''
	};

	if (Title.length > 10) {
		ErrorMessage.error = true;
		ErrorMessage.errorMessage = 'Please enter less than 10 characters';
	}
	else if (Title.length === 0 || content.length === 0) {
		ErrorMessage.error = true;
		ErrorMessage.errorMessage = 'Fields can not be empty';
	}

	return ErrorMessage;
}

export default {
	folderNaming,
	NoteValidation
};
