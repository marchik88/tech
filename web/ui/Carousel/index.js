import React from 'react';
import s from './style.sass';

export default Carousel => ({ className = '', ...props }) => (
  <div className={`${s.Carousel || ''} ${className || ''}`}>
    <Carousel {...props}>{props.children}</Carousel>
  </div>
);
