import React from 'react';
import s from './style.sass';

export default Element => ({ className = '', ...props }) => (
  <Element className={`${s.Element || ''} ${className || ''}`} {...props}>
    {props.children}
  </Element>
);
