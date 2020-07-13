import React from 'react';

// Components
import { Menu } from '~/ui';

// Styles
import s from './style.sass';

export const MenuItem = ({
  link = '',
  text = '',
  label = '',
  menuPath = '',
  Icon = () => {},
  goToPage = () => {},
  ...props
}) => {
  const itemStyle = { color: menuPath == label ? '#7b77d2' : 'inherit' };

  return (
    <Menu
      type="submenu"
      key={label}
      {...props}
      title={
        <span onClick={goToPage(link)} className={s.MenuButton} style={itemStyle}>
          <Icon />
          <span>{text}</span>
        </span>
      }></Menu>
  );
};

{
  /* <Menu type="group" key="g1" title="Item 1">
  <Menu type="item" key="1">
    Option 1
  </Menu>
  <Menu type="item" key="2">
    Option 2
  </Menu>
</Menu> */
}
