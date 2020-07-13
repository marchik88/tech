import localforage from 'localforage';

const stores = new Map();

stores.set(
  'main',
  localforage.createInstance({
    name: 'PROJECT',
  })
);

export default {
  config: {
    name: 'localforage',
    version: '0.0.1',
    type: 'private',
  },
  stores,
};
