import core from '~/../core';

const lf = core.import.plugin.localforage;

export const getExample = () => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').getItem('Example');
};

export const setExample = data => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').setItem('Example', data);
};