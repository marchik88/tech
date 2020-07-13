import React from 'react';

// Styles
import s from './style.sass';

export const FacebookButton = props => {
  return (
    <div className={s.FacebookBtn} {...props}>
      <div className={s.FacebookIconWrapper}>
        <img
          className={s.FacebookIcon}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png"
          {...props}
        />
      </div>
      <p className={s.BtnText} {...props}>
        <b>Facebook</b>
      </p>
    </div>
  );
};
