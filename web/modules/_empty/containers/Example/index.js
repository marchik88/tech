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
    return (
      <>
        <Flex justify="space-between" style={{ width: '100%' }}>
          example
        </Flex>
      </>
    );
  }
);
