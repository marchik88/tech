import React from 'react';
import s from './style.sass';

export default Text => ({ className = '', background, color, ...props }) => {
  const customStyles = {};

  if (background) customStyles.background = background;
  if (color) customStyles.color = color;

  return (
    <Text
      className={`${s.Text || ''} ${className || ''}`}
      style={{
        ...(props.style || {}),
        ...customStyles,
      }}
      {...props}>
      {props.children}
    </Text>
  );
};
