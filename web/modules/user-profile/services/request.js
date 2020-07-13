import core from '~/../core';

// import plugins
const { API } = core.import.plugin.request;

export default {
  profile: new API('profile'),
  users: new API('users'),
};
