import React from 'react';
import s from './style.sass';

export default Card => ({ className = '', background, color, ...props }) => {
  const customStyles = {};

  if (background) customStyles.background = background;
  if (color) customStyles.color = color;

  return (
    <Card
      className={`${s.Card || ''} ${className || ''}`}
      style={{
        ...(props.style || {}),
        background,
        color,
      }}
      {...props}>
      {props.children}
    </Card>
  );
};
