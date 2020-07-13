import core from '~/../core';

// import plugins
const { API } = core.import.plugin.request;

export default {
  settings: new API('settings'),
};
