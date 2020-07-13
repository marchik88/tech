import React from 'react';
import s from './style.sass';

export default Message => ({ className = '', type, ...props }) => (
  <Message className={`${s.Message || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Message>
);
