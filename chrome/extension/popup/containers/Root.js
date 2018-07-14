import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

// i18n
import {
  addLocaleData,
  IntlProvider,
} from 'react-intl';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

import App from './App';
import { language, messages } from '../../common/i18n';

addLocaleData([...en, ...ko]);

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <IntlProvider
        locale={language}
        messages={messages}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </IntlProvider>
    );
  }
}
