import React from 'react';

// Components
import { Flex, Input } from '~/ui';

// Styles
import s from './style.sass';

export const LabeledInput = ({ id = '', className = '', label = '', desc, ...props }) => {
  return (
    <Flex
      direction="column"
      align="baseline"
      className={`${s.LabeledInput || ''} ${className || ''}`}>
      <label for={id}>{label}</label>
      <Input id={id} {...props} />
      {desc && <span color="muted">{desc}</span>}
    </Flex>
  );
};

// We&amp;ll never share your email with anyone else.
