import React from 'react';
import s from './style.sass';

export default Avatar => ({ className = '', type, ...props }) => (
  <Avatar className={`${s.Avatar || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Avatar>
);
