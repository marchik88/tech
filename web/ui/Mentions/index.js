import React from 'react';
import s from './style.sass';

export default Mentions => ({ className = '', type, ...props }) => (
  <Mentions className={`${className || ''}`} type={type} {...props}>
    {props.children}
  </Mentions>
);
