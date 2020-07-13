import React from 'react';
import s from './style.sass';

export default (Spin) => ({ className = '', ...props }) => (
  <Spin className={`${s.Spin || ''} ${className || ''}`} {...props}>
    {props.children}
  </Spin>
);
