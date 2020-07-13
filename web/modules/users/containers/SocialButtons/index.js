import React from 'react';

// Components
import { GoogleButton } from '../../components/GoogleButton';
import { FacebookButton } from '../../components/FacebookButton';

// Components
import { Flex } from '~/ui';

// Styles
import s from './style.sass';

export const SocialButtons = () => (
  <Flex justify="space-between" className={s.Links}>
    <GoogleButton />
    <FacebookButton />
  </Flex>
);
