import React from 'react';
import ReactDOM from 'react-dom';

// i18n
import {
  addLocaleData,
  IntlProvider,
} from 'react-intl';


import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

import { language, messages } from '../common/i18n';
import LayoutEnhancer from './LayoutEnhancer';


// configurations
const wrapperClassName = 'LayoutEnhancer';
const wrapperClassSelector = `.${wrapperClassName}`;

addLocaleData([...en, ...ko]);

export default class Main {
  constructor() {
    this.logEnabled = false;

    this.log('Main class constructed');
  }

  log(msg) {
    if (this.logEnabled) {
      console.log(msg);
    }
  }

  injectMain() {
    this.log('injectMain called');

    // check if editor mode: localStorage: replyEditorData-rte
    const targetElem = document.querySelector('.ReplyEditor__title');
    if (!targetElem) {
      return;
    }

    const elem = targetElem.parentNode;
    const injectedElem = elem.querySelector(wrapperClassSelector);

    if (injectedElem == null) {
      this.log('injectMain added');

      const wrapper = document.createElement('div');
      wrapper.className = wrapperClassName;
      elem.appendChild(wrapper);
      // elem.insertBefore(wrapper, elem.firstChild);

      ReactDOM.render(
        <IntlProvider
          locale={language}
          messages={messages}
        >
          <LayoutEnhancer />
        </IntlProvider>,
        wrapper
      );
    }
  }
}
