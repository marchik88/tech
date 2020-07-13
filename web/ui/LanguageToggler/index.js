import React, { useState, useEffect } from 'react';
import s from './style.sass';

export default ({
  checked = 'false',
  onClick = () => {},
  left = '#000',
  right = '#000',
  className = '',
}) => {
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    setSwitched(checked);
  }, [checked]);

  const switcher = () => {
    setSwitched(!switched);
    onClick();
  };

  return (
    <>
      <div
        className={`${s.languageToggle} ${switched ? s.changed : ''} ${className}`}
        onClick={switcher}>
        <div style={{ color: left }} className={`${s.languageToggleText} ${s.pl}`}>
          RU
        </div>
        <div style={{ color: right }} className={`${s.languageToggleText} ${s.en}`}>
          EN
        </div>
        <div className={`${s.languageToggleBlobs}`}></div>
      </div>
    </>
  );
};
