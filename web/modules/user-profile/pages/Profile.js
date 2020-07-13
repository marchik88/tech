import React from 'react';

// Components
import { Flex, Card } from '~/ui';

// Containers
import ProfileInfo from '../containers/ProfileInfo';
import Courses from '../containers/Courses';

// Styles
import s from './style.sass';

export default () => (
  <section className={s.Main}>
    <Flex className={s.Courses}>
      <Courses />
    </Flex>
    <Flex className={s.Profile}>
      <ProfileInfo />
    </Flex>
  </section>
);
