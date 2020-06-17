import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import folderIcon from '../../assets/hiclipart.com (59).png';
import './sideBar-style.css';

const SideBar = (props) => {
	let style;
	let styleH2;
	if (props.folder.id === props.link) {
		style = {
			textDecoration : 'none',
			background     : '#0f575d',
			color          : 'white',
			display        : 'flex'
		};
		styleH2 = { color: 'white' };
	}

	return (
		<Link to={`/${props.folder.id}`} style={{ textDecoration: 'none' }}>
			<div className='card' key={props.folder.id} style={style}>		
				<img src={folderIcon} alt='folderIcon' style={{ width: '40px' }} />
				<h3 style={styleH2}>{props.folder.title}</h3>
			</div>
		</Link>
	);
};

SideBar.propTypes={
	props: PropTypes.shape({
		folder: PropTypes.shape({
			date_published : PropTypes.string.isRequired,
			id: PropTypes.number.isRequired,
			title:PropTypes.string.isRequired
		}),
		link: PropTypes.string.isRequired
	}

	)
}

export default SideBar;
