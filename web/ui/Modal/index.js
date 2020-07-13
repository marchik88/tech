import React from 'react';
import s from './style.sass';

export default Modal => ({ className = '', ...props }) => (
  <Modal className={`${s.Modal || ''} ${className || ''}`} {...props}>
    {props.children}
  </Modal>
);
