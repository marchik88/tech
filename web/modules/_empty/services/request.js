import core from '~/../core';

// import plugins
const { API } = core.import.plugin.request;

export default {
  example: new API('example'),
};
