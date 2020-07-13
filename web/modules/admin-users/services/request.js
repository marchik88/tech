import core from '~/../core';

// import plugins
const { API } = core.import.plugin.request;

export default {
  users: new API('users'),
  auth: new API('auth'),
};
