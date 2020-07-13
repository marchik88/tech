import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// UI
import {} from '~/ui';
// Styles
import s from './style.sass';
// Default settings

export default connect(
  ({ themes: { theme, mt }, languages: { lang, t } }) => ({
    theme,
    lang,
    mt,
    t,
  }),
  ({ themes: { changeTheme }, languages: { changeLanguage } }) => ({
    changeTheme,
    changeLanguage,
  })
)(
  // props
  ({
    theme = {},
    lang = {},
    mt = () => {},
    t = () => {},
    changeTheme = () => {},
    changeLanguage = () => {},
  }) => {
    useEffect(() => {
      changeLanguage(lang, true);
      changeTheme(theme);
    }, []);
    return (
      <>
        <div className={s.adminDashboard} style={{ background: mt('background') }}>
          <button
            onClick={() => {
              changeTheme(theme === 'light' ? 'dark' : 'light');
            }}>
            {t(
              theme === 'light'
                ? 'admin_dashboard.main_page.lightTheme'
                : 'admin_dashboard.main_page.darkTheme'
            )}
          </button>
          <button
            onClick={() => {
              changeLanguage(lang === 'ru' ? 'en' : 'ru');
            }}>
            {t('admin_dashboard.main_page.language')}
          </button>
        </div>
      </>
    );
  }
);
