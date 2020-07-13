import React from 'react';
import s from './style.sass';

export default Upload => ({
	className = '', ...props
}) => {
	return <Upload className={`${s.Upload || ''} ${className || ''}`} {...props}>
		{props.children}
	</Upload>
};