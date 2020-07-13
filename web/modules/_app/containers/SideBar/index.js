import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

// Containers
import { MenuItems } from './MenuItems';

// Components
import { Menu } from '~/ui';

// Static Data
import itemsList from './menu-items';

// Utils
import { isAdminPath, setActiveMenu, isErrorPath } from './controller';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({ languages: {t}, themes: { mt }, adminProfile: { sideMenuToggle }, users: { userData } }) => ({
  sideMenuToggle,
  userData,
  t,
  mt,
});

const getMethodsFromStore = ({
  adminProfile: { setSideMenuToggle },
  users: { setUserData },
}) => ({
  setSideMenuToggle,
  setUserData,
});

export const SideBar = connect(
  // store data
  getDataFromStore,
  // store functions
  getMethodsFromStore
)(
  withRouter(
    // props
    ({
      setSideMenuToggle = () => {},
      t = () => {},
      mt = () => {},
      sideMenuToggle, router = {},
      userData = {} }) => {
      // state
      const [menuPath, setMenuPath] = useState('profile');

      // did update
      useEffect(() => {
        setActiveMenu(itemsList || [], setMenuPath, router);
      }, [router]);

      // Check if we located in admin or error pages
      const inAdminPage = isAdminPath(router);
      const inErrorPage = isErrorPath(router);
      const isMenuPadding = (sideMenuToggle && inAdminPage) || inErrorPage;

      const goToPage = link => () => {
        router.push(link);
      };

      const hideMenuOnClickBurger = {
        left: !inAdminPage || isMenuPadding ? '0px' : '-155px',
        display: !inAdminPage ? 'none' : 'flex',
      };

      const menuLabelsLang = t('_app.sidebar.label');

      return (
        <Menu
          className={s.Menu}
          // mode="vertical"
          mode="inline"
          // defaultSelectedKeys={['dashboard']}
          // defaultOpenKeys={['dashboard']}
          style={{
            ...hideMenuOnClickBurger,
            background: mt('backgrounds.main')
          }}>
          <MenuItems
            menuPath={menuPath}
            lang={menuLabelsLang}
            itemsList={itemsList || []}
            goToPage={goToPage}
            style={{color: mt('colors.main')}}
          />
        </Menu>
      );
    }
  )
);
