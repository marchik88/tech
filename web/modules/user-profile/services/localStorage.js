import core from '~/../core';

const lf = core.import.plugin.localforage;

export const getProfileData = () => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').getItem('profileData');
};

export const setProfileData = data => {
  const lf = core.import.plugin.localforage;

  return lf.stores.get('main').setItem('profileData', data);
};