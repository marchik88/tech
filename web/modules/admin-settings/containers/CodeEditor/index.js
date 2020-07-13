import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';

// Styles
import s from './style.sass';

// Redux
const getDataFromStore = ({ themes: { mt }, languages: { t } }) => ({
  mt,
  t,
});
const getMethodsFromStore = () => ({});

export const CodeEditor = connect(
  getDataFromStore,
  getMethodsFromStore
)(({ t = () => {}, mt = () => {}, scheme = { root: true }, updateScheme = () => {} }) => {
  const [text, setText] = useState(JSON.stringify(scheme, null, 4));

  const handleUpdateScheme = value => {
    setText(value);
    updateScheme(text);
  };

  useEffect(() => {
    setText(JSON.stringify(scheme, null, 4));
  }, [scheme]);

  require('codemirror/mode/xml/xml');
  require('codemirror/mode/javascript/javascript');

  return (
    <div style={{ width: '80%' }} onMouseLeave={() => updateScheme(text)}>
      <CodeMirror
        style={{ width: '80%' }}
        value={text}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setText(value);
          // handleUpdateScheme(value);
          // console.log(value);
        }}
        // onChange={(editor, data, value) => {
        //   console.log(value);
        //   handleUpdateScheme(value);
        // }}
      />
    </div>
  );
});
