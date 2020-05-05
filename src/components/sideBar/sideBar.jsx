import React from 'react';
import { Link } from 'react-router-dom';
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
				<h2 style={styleH2}>{props.folder.name}</h2>
			</div>
		</Link>
	);
};

export default SideBar;
