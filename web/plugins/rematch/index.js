import { init } from '@rematch/core';
import Redux from '../redux';

const initStore = models => {
  const store = init({ models });

  return props => <Redux.Provider store={store}>{props.children}</Redux.Provider>;
};

export default {
  config: {
    name: 'rematch',
    version: '0.0.1',
    type: 'private',
  },
  initStore,
};
