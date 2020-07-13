import React from 'react';
import s from './style.sass';

export default Drawer => ({ className = '', type, ...props }) => (
  <Drawer className={`${s.Drawer || ''} ${className || ''}`} type={type} {...props}>
    {props.children}
  </Drawer>
);
