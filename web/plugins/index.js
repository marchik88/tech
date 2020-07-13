import core from '~/../core';
import redux from './redux';
import rematch from './rematch';
import localforage from './localForage';
import request from './request';
import browserNotify from './browser-notify';

core.add.to.plugins = redux;
core.add.to.plugins = rematch;
core.add.to.plugins = localforage;
core.add.to.plugins = request;
core.add.to.plugins = browserNotify;
