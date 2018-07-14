import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style/index.css';

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/index.css';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/index.css';

import './LayoutEnhancer.scss';

import LayoutTemplateList from './LayoutTemplateList';
import LineTemplateList from './LineTemplateList';
import QuotationTemplateList from './QuotationTemplateList';

import findReactComponentFromElement from './reactNodeFinder';

const { TabPane } = Tabs;

// This is only for localized string scraping.
// const messages = defineMessages({
//   errorTitle: {
//     id: "errorTitle"
//   },
// });

class LayoutEnhancer extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    const { intl } = this.props;
    this.$t = id => intl.formatMessage({ id });

    // this.onTemplateSelected에서 this가 유의미하려면 이 컨텐츠는 class constructor 안에 정의되어야한다.
    this.popoverContent = (
      <div>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="Layouts" key="1">
            <LayoutTemplateList
              numbers={[1, 2, 3]}
              onClick={this.onTemplateSelected}
            />
            <LayoutTemplateList
              numbers={[4, 5, 6]}
              onClick={this.onTemplateSelected}
            />
          </TabPane>

          <TabPane tab="Lines" key="2">
            <LineTemplateList
              numbers={[1, 2, 3, 4, 5, 6, 7]}
              onClick={this.onTemplateSelected}
            />
          </TabPane>

          <TabPane tab="Quotations" key="3">
            <QuotationTemplateList
              numbers={[1, 2]}
              onClick={this.onTemplateSelected}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }


  onTemplateSelected = (template) => {
    const richEditor = document.querySelector('.DraftEditor-root');
    if (richEditor) {
      notification.open({
        message: this.$t('errorTitle'),
        description: this.$t('richEditorNotSupported'),
      });

      this.hide();
      return;
    }

    this.insertTemplate(template);
    this.hide();
  };

  insertTemplate = (template) => {
    const textArea = document.querySelector('textarea[name="body"]');

    // textArea's value is bind to ".ReplyEditor" component's state
    const reactElem = document.querySelector('.ReplyEditor');
    const reactComp = findReactComponentFromElement(reactElem);

    if (!(textArea && reactElem && reactComp)) {
      notification.open({
        message: this.$t('errorTitle'),
        description: this.$t('extensionInitFailed'),
      });
      return;
    }

    let finalText;

    if (textArea.selectionStart) {
      const startPos = textArea.selectionStart;
      const endPos = textArea.selectionEnd;
      finalText = textArea.value.substring(0, startPos) + template + textArea.value.substring(endPos, textArea.value.length);
    } else {
      finalText = textArea.value + template;
    }

    // update steem's react component's state
    const newState = reactComp.state;
    newState.body.props.value = finalText;
    newState.body.value = finalText;
    reactComp.setState(newState);

    reactComp.forceUpdate();
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Popover
          content={this.popoverContent}
          trigger="click"
          visible={visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button className="template">{this.$t('btnTemplate')}</Button>
        </Popover>
      </div>
    );
  }
}

export default injectIntl(LayoutEnhancer);
