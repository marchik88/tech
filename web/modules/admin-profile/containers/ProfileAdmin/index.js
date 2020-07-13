import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

// Icons
// import { ClockCircleOutlined } from '@ant-design/icons';

// Components
import { Flex, Text } from '~/ui';
//style
import s from './style.sass';

// Redux
const getDataFromStore = ({ themes: { theme, mt }, languages: { lang, t } }) => ({
  theme,
  lang,
  mt,
  t,
});
const getMethodsFromStore = ({
  themes: { changeTheme },
  languages: { changeLanguage },
}) => ({
  changeTheme,
  changeLanguage,
});

export default connect(
  // store data
  getDataFromStore,
  getMethodsFromStore
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
    return (
      <>
        <Flex className={s.Profile} direction="column" justify="center" align="center">
          <Flex className={s.UserData} direction="column" align="center">
            <p>Фото</p>
            <p className={s.ProfileImg}>
              <img src="/images/workerAvatar.svg" />
            </p>
          </Flex>
          <Flex className={s.UserData} direction="row" justify="normal" align="normal">
            <Flex direction="column" align="center">
              <p className={s.Name}>ФИО</p>
              <p>
                <b>Ivanov Ivan</b>
              </p>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
);
