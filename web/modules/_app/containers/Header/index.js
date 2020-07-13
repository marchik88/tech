import React, { useEffect } from 'react';
// import Link from 'next/link';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

// Core
import core from '~/../core';

// Components
import { Flex, ThemeToggler, LanguageToggler, Button } from '~/ui';

// Utils
import { isProfilePath, isAdminPath, langColorsSwither } from './controller';

// Icons
import { MenuUnfoldOutlined } from '@ant-design/icons';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({
  users: { userData },
  themes: { theme, mt },
  languages: { lang, t },
  adminProfile: { sideMenuToggle },
}) => ({
  sideMenuToggle,
  userData,
  theme,
  lang,
  mt,
  t,
});

const getMethodsFromStore = ({
  themes: { changeTheme },
  languages: { changeLanguage },
  adminProfile: { setSideMenuToggle },
}) => ({
  setSideMenuToggle,
  changeTheme,
  changeLanguage,
});

export default connect(
  // store data
  getDataFromStore,
  // store functions
  getMethodsFromStore
)(
  withRouter(
    // props
    ({
      lang = {},
      theme = {},
      router = {},
      userData = {},
      className = '',
      sideMenuToggle,
      t = () => {},
      mt = () => {},
      changeTheme = () => {},
      changeLanguage = () => {},
      setSideMenuToggle = () => {},
      ...props
    }) => {
      useEffect(() => {
        changeLanguage(lang, true);
        changeTheme(theme);
      }, []); // refactor render

      const inProfilePage = isProfilePath(router);
      const inAdminPage = isAdminPath(router);

      const languageSwither = () => {
        changeLanguage(lang === 'ru' ? 'en' : 'ru');
      };
      const themeSwither = () => {
        changeTheme(theme === 'light' ? 'dark' : 'light');
      };

      const clearLocalData = async () => {
        const lf = core.import.plugin.localforage;

        await lf.stores.get('main').clear();
      };

      const handleSignButton = type => () => {
        if (type === 'out') {
          router.push('/');
          clearLocalData();
        } else {
          router.push('/signin');
        }
      };

      return (
        <header
          className={`${s.Header || ''} ${className}`}
          style={{
            background: mt('backgrounds.header'),
            color: mt('colors.header'),
          }}
          {...props}>
          {/* Left */}
          <Flex className={s.LeftSide}>
            {inAdminPage ? (
              <MenuUnfoldOutlined
                style={{ fontSize: 22, margin: '0 20px' }}
                onClick={setSideMenuToggle}
              />
            ) : (
              ''
            )}
            <div className={s.LogoText}>Courses</div>
          </Flex>
          {/* Center */}
          {/* <Flex style={{ width: 200, justifyContent: 'center' }}>
            <img className={s.Logo} width="80px" src="/example_logo.svg" />
          </Flex> */}
          {/* Right */}
          <Flex className={s.RightSide}>
            <ThemeToggler
              className={s.ThemeSwitcher}
              onClick={themeSwither}
              checked={theme === 'dark' ? false : true}
            />
            <LanguageToggler
              className={s.LanguageSwitcher}
              left={langColorsSwither('ru', theme, lang, mt)}
              right={langColorsSwither('en', theme, lang, mt)}
              onClick={languageSwither}
              checked={lang === 'ru' ? false : true}
            />
            <Button
              onClick={handleSignButton(inProfilePage || inAdminPage ? 'out' : 'in')}
              className={s.ButtonSign}>
              {inProfilePage || inAdminPage ? 'Выйти' : 'Войти'}
            </Button>
          </Flex>
        </header>
      );
    }
  )
);
