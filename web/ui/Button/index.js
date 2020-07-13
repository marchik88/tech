import React from 'react';
import s from './style.sass';

export default Button => ({ className = '', type, ...props }) => (
  <Button className={`${s.Button || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Button>
);
