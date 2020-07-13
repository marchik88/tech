import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const reducers = {};

const initStore = () => createStore(combineReducers(reducers), applyMiddleware(logger));

export default {
  config: {
    name: 'redux',
    version: '0.0.1',
    type: 'private',
  },
  reducers,
  initStore,
  Provider,
  connect,
};
