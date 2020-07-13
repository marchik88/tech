import React from 'react';
import { connect } from 'react-redux';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({ themes: { theme, mt }, languages: { lang, t } }) => ({
  theme,
  lang,
  mt,
  t,
});

const getMethodsFromStore = ({}) => ({});

export default connect(
  // store data
  getDataFromStore,
  // store functions
  getMethodsFromStore
)(({ className = '', mt = () => {}, ...props }) => (
  <footer
    className={`${s.Footer || ''} ${className}`}
    style={{
      background: mt('backgrounds.footer'),
      color: mt('colors.footer'),
    }}
    {...props}>
    {new Date().getFullYear() + ' project'}
  </footer>
));
