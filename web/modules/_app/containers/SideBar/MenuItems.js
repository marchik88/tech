import React from 'react';
// Components
import { MenuItem } from './MenuItem';

export const MenuItems = ({
  menuPath = '',
  itemsList = [],
  lang = {},
  goToPage = () => {},
  ...props
}) => {
  return (itemsList || []).map(item => {
    let {label = '', text: itemText = ''} = item,
        {[label]: text = itemText} = lang;

    return <MenuItem text={text} {...item}
                     menuPath={menuPath}
                     goToPage={goToPage}
                     {...props} />;
  });
};
