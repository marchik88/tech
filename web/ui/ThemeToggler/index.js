import React from 'react';
import s from './style.sass';

export default ({ checked = 'false', onClick = () => {}, className = '' }) => (
  <>
    <div className={`${s.themeToggle} ${className}`} onClick={onClick}>
      <input
        type="checkbox"
        name="checkbox"
        className={s.themeSwitch}
        checked={checked}
      />
    </div>
  </>
);
