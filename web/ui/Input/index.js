import React from 'react';
import s from './style.sass';

export default Input => ({ className = '', type, background, color, ...props }) => {
  const customStyles = {};

  if (background) customStyles.background = background;
  if (color) customStyles.color = color;

  return (
    <Input
      className={`${s.Image || ''} ${className || ''}`}
      type={type}
      style={{
        ...(props.style || {}),
        ...customStyles,
      }}
      {...props}>
      {props.children}
    </Input>
  );
};
