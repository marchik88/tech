import React from 'react';
import s from './style.sass';

export default Select => ({ className = '', type, ...props }) => (
  <Select className={`${s.Select || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Select>
);
