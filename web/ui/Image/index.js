import React from 'react';
import s from './style.sass';

export default Image => ({ className = '', ...props }) => (
  <Image className={`${s.Image || ''} ${className || ''}`} {...props}>
    {props.children}
  </Image>
);
