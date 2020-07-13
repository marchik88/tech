import React from 'react';
import s from './style.sass';

export default Menu => ({
	className = '', ...props
}) => {
	return <Menu className={`${s.Menu || ''} ${className || ''}`} {...props}>
		{props.children}
	</Menu>
};