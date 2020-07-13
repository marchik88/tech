import React from 'react';

// Styles
import s from './style.sass';

export const GoogleButton = props => {
  return (
    <div className={s.GoogleBtn} {...props}>
      <div className={s.GoogleIconWrapper}>
        <img
          className={s.GoogleIcon}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          {...props}
        />
      </div>
      <p className={s.BtnText} {...props}>
        <b>Google</b>
      </p>
    </div>
  );
};
