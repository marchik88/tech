import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Example from '../containers/Example';
import Link from 'next/link';
// Components
import { Button } from '~/ui';

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
  ({
    theme = {},
    lang = {},
    mt = () => {},
    t = () => {},
    changeTheme = () => {},
    changeLanguage = () => {},
  }) => {
    return (
      <div>
        <section>
          <Example />
        </section>
      </div>
    );
  }
);
