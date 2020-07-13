import React from 'react';
import s from './style.sass';

export default Table => ({ className = '', ...props }) => (
  <Table className={`${s.Table || ''} ${className || ''}`} {...props}>
    {props.children}
  </Table>
);
