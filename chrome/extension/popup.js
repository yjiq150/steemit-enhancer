import React from 'react';
import ReactDOM from 'react-dom';
import Root from './popup/containers/Root';

import defaultSettings from './common/defaultSettings';

chrome.storage.sync.get(null, (settings) => {
  const initialSettings = { ...defaultSettings, ...settings };
  const initialState = {
    settings: initialSettings
  };

  const createStore = require('./popup/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
