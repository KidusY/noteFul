import React, { Component } from 'react';

class errorBoundary extends Component {
	constructor (props) {
		super(props);

		this.state = {
			hasError : false
		};
	}

	static getDerivedStateFromError (error) {
		return {
			hasError : true
		};
	}

	render () {
		if (this.state.hasError) {
			return <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}> Oops!!! something went wrong</h1>;
		}
		else {
			return this.props.children;
		}
	}
}

export default errorBoundary;
