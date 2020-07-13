import core from '~/../core';

// import plugins
const { API } = core.import.plugin.request;

export default {
  languages: new API('languages'),
};
