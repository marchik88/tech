import React from 'react';
import s from './style.sass';

export default Layout => ({ className = '', type, ...props }) => (
  <Layout className={`${className || ''}`} type={type} {...props}>
    {props.children}
  </Layout>
);
