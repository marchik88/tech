import core from '~/../core';

const lf = core.import.plugin.localforage;

export const userData = {
  get get() {
    return lf.stores.get('main').getItem('userData');
  },
  set set(data) {
    return lf.stores.get('main').setItem('userData', data);
  },
};

export const userToken = {
  get get() {
    return lf.stores.get('main').getItem('token');
  },
  set set(data) {
    return lf.stores.get('main').setItem('token', data);
  },
};
