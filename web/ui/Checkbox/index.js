import React from 'react';
import s from './style.sass';

export default Checkbox => ({ className = '', type, ...props }) => (
  <Checkbox className={`${s.Checkbox || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Checkbox>
);
