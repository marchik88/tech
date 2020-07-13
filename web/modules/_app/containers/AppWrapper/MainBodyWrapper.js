import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { Spin } from '~/ui';
import core from '~/../core';
import s from './style.sass';

// memoize
let checkTheme = false;

export default connect(
  // store data
  ({ users: { userData }, themes: { theme, mt }, adminProfile: { sideMenuToggle } }) => ({
    mt,
    theme,
    userData,
    sideMenuToggle,
  }),
  // store functions
  ({
    adminProfile: { setSideMenuToggle },
    adminSettings: { getAllSettings },
    users: { setUserData, getAllUsers, getUserProfile },
  }) => ({
    setUserData,
    getAllUsers,
    getUserProfile,
    setSideMenuToggle,
    getAllSettings,
  })
)(
  withRouter(
    ({
      mt,
      theme,
      router = {},
      userData = {},
      className = '',
      sideMenuToggle,
      getAllUsers = () => {},
      setUserData = () => {},
      getUserProfile = () => {},
      getAllSettings = () => {},
      ...props
    }) => {
      const [loading, setLoading] = useState(false);
      // const [uData, setUData] = useState({});
      // const [userToken, setUserToken] = useState('');
      // const [needProfile, setNeedProfile] = useState(true);

      useEffect(() => {
        if (!checkTheme || checkTheme !== theme) {
          const checkRootThemeTag = setInterval(() => {
            const rootThemeTag = global.document.body;

            if (rootThemeTag && mt) {
              rootThemeTag.style.background = mt('backgrounds.main');
              rootThemeTag.style.color = mt('colors.main');

              clearInterval(checkRootThemeTag);
              checkTheme = theme;
            }
          }, 10);
        }
      }, [theme]);

      const isHomePage = router.pathname === '/';
      const isLoginPage = router.pathname === '/signin';
      const isRegisterPage = router.pathname === '/signup';
      // const notAuth = !userToken || !uData.email;

      useEffect(() => {
        getUserData();
        getAllSettings();
      }, []);

      const getUserData = async data => {
        const lf = core.import.plugin.localforage;

        const userData = (await lf.stores.get('main').getItem('userData')) || {};
        const tokenData = (await lf.stores.get('main').getItem('token')) || '';
        const isLSAuth = tokenData && userData.email;

        // const isAdminRole = (userData || {}).role === 'administrator';
        // const isManagerRole = (userData || {}).role === 'manager';

        setLoading(true);

        if (!isLSAuth && !isHomePage && !isLoginPage && !isRegisterPage)
          return router.push('/');
        if (isLSAuth && isHomePage) return router.push('/profile');

        // if(userData.todayTime) delete userData.todayTime;
        // setUserToken(tokenData);
        // setUData(userData);
        // setUserData({ ...userData, todayTime: data.todayTime });
      };

      return (
        <>
          {!loading ? (
            <div className={`${className}`}>
              <Spin />
            </div>
          ) : (
            <div
              className={`${className} ${
                sideMenuToggle && router.pathname.includes('/') ? s.pad : s.padManager
              }`}>
              {props.children}
            </div>
          )}
        </>
      );
    }
  )
);
