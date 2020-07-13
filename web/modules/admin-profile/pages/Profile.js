import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Components
import ProfileAdmin from '../containers/ProfileAdmin';
// Core
import core from '~/../core';
// Local Components
import ButtonLink from '../components/ButtonLink';

export default connect(
  // store data
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
  //props
  ({
    theme = {},
    lang = {},
    mt = () => {},
    t = () => {},
    changeTheme = () => {},
    changeLanguage = () => {},
  }) => {
    const _clearLS = async () => {
      const lf = core.import.plugin.localforage;

      await lf.stores.get('main').clear();
    };
    return (
      <section>
        <ProfileAdmin />
        <ButtonLink href="/profile">В профиль пользователя</ButtonLink>
        <p onClick={() => _clearLS()}>
          <ButtonLink href="/">Выход</ButtonLink>
        </p>
      </section>
    );
  }
);
