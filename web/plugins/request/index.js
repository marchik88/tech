import config from './config.json';
import lf from '../localForage';

const { apiURL, apiProductionURL, apiVersion } = config;
const LOCAL_DOMAINS = ['localhost', '127.0.0.1'];

class API {
  constructor(entity = '', url = apiProductionURL) {
    if (LOCAL_DOMAINS.includes((global.window || { location: {} }).location.hostname)) {
      url = apiURL;
    }
    this.URL = `${url}${apiVersion ? '/' : ''}${apiVersion}/${entity}`; //?
  }

  dataToURL = (data = {}) => {
    return Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  };

  request = async ({ url, method, isAuth, body }) => {
    const headers = {};
    const options = { method };
    const token = await lf.stores.get('main').getItem('token');

    if (isAuth) headers.authorization = `Bearer ${token}`;
    if (body) options.body = JSON.stringify(body);

    headers['content-type'] = 'application/json';
    options.headers = headers;

    return fetch(url, options)
      .then(res => res.json())
      .catch(() => {
        throw new Error('Cannot connect to server');
      });
  };

  get = (path = '', isAuth = false, queries) => {
    return this.request({
      url: `${this.URL}/${path}${queries ? '?' + this.dataToURL(queries) : ''}`,
      method: 'GET',
      isAuth,
    });
  };

  post = (path = '', isAuth = false, body = {}) => {
    return this.request({
      url: `${this.URL}/${path}`,
      method: 'POST',
      isAuth,
      body,
    });
  };

  put = (path = '', isAuth = false, body = {}) => {
    return this.request({
      url: `${this.URL}/${path}`,
      method: 'PUT',
      isAuth,
      body,
    });
  };

  delete = (path = '', isAuth = false) => {
    return this.request({
      url: `${this.URL}/${path}`,
      method: 'DELETE',
      isAuth,
    });
  };
}

export default {
  config,
  API,
};

// import core from '~/../core';
// const { API } = core.import.plugin.request;
