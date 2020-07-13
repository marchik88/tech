import React from 'react';
import Link from 'next/link';
import { Button } from '~/ui';
import s from './style.sass';

export default props => {
  return (
    <div className={s.Wrap}>
      <Button className={s.LinkToExit}>
        <Link href={props.href}>{props.children}</Link>
      </Button>
    </div>
  );
};
