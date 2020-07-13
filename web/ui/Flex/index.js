import React from 'react';
import s from './style.sass';

export default ({
  direction = 'row',
  align = 'center',
  justify = 'space-around',
  wrap,
  width,
  onClick = () => {},
  className = '',
  ...props
}) => {
  const customStyles = {
    flexDirection: direction,
    flexWrap: !wrap ? 'nowrap' : 'wrap',
    alignItems: align,
    justifyContent: justify,
    // width: width || 'auto',
  };
  if (width) customStyles.width = width;

  return (
    <div className={`${s.Flex || ''} ${className || ''}`} style={customStyles} {...props}>
      {props.children}
    </div>
  );
};
