import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

// antd common style (font, theme, etc)
// import 'antd/lib/style/index.css';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';

import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/index.css';

const { Option, OptGroup } = Select;

const fontListKorean = [
  'Nanum Gothic',
  'Nanum Myeongjo',
  'Song Myung',
];

const fontListEnglish = [
  'Open Sans',
  'Noto Sans',
  'Roboto',
  'Lato',
];

// extract font list
// https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key={key}
// cat fontlist | jq '.items[] | .family'

const fontListAll = require('./fontList');


function FormGroup(props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <div className="item">
        {props.children}
      </div>
    </div>
  );
}

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    const { intl } = this.props;
    this.$t = id => intl.formatMessage({ id });
  }

  handleChange = key => (value) => {
    const { actions } = this.props;
    actions.updateSettings({ [key]: value });
  };


  render() {
    const { settings } = this.props;

    return (
      <div className="settings">
        <h1>Steemit.com Enhancer {this.$t('settings')}</h1>

        <h2>Viewer</h2>
        <FormGroup label={this.$t('readabilityMode')}>
          <Switch
            checked={settings.readabilityMode}
            onChange={this.handleChange('readabilityMode')}
          />
        </FormGroup>

        <FormGroup label={this.$t('customFont')}>
          <Select
            defaultValue={settings.fontName}
            style={{ width: 200 }}
            onChange={this.handleChange('fontName')}
          >
            <Option value="">{this.$t('default')}</Option>

            <OptGroup label={this.$t('korean')}>
              {fontListKorean.map(item => <Option key={item} value={item}>{item}</Option>)}
            </OptGroup>

            <OptGroup label={this.$t('english')}>
              {fontListEnglish.map(item => <Option key={item} value={item}>{item}</Option>)}
            </OptGroup>

            <OptGroup label={this.$t('popularWebFonts')}>
              {fontListAll.map(item => <Option key={item} value={item}>{item}</Option>)}
            </OptGroup>

          </Select>
        </FormGroup>

        <h2>Editor</h2>
        {/*<FormGroup label="Template Support">*/}
        {/*<Switch*/}
        {/*checked={settings.templateSupport}*/}
        {/*onChange={this.handleChange('templateSupport')} />*/}
        {/*</FormGroup>*/}

        <FormGroup label={this.$t('sidePreview')}>
          <Switch
            checked={settings.sidePreview}
            onChange={this.handleChange('sidePreview')}
          />
        </FormGroup>

      </div>
    );
  }
}

export default injectIntl(Settings);
