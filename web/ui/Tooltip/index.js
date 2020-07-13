import React from 'react';
import s from './style.sass';

export default Tooltip => ({ className = '', ...props }) => (
  <Tooltip className={`${s.Tooltip || ''} ${className || ''}`} {...props}>
    {props.children}
  </Tooltip>
);
