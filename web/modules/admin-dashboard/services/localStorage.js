import core from '~/../core';

const lf = core.import.plugin.localforage;

export const getThemeMode = () => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').getItem('themeMode');
};

export const setThemeMode = data => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').setItem('themeMode', data);
};
export const getLanguage = () => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').getItem('language');
};

export const setLanguage = data => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').setItem('language', data);
};