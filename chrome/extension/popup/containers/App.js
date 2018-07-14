import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Settings from '../components/Settings';
import * as SettingActions from '../actions/settings';
import './App.scss';

class App extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { settings, actions } = this.props;

    return (
      <div className="app">
        <img className="logo" src="img/icon-48.png" />
        <Settings settings={settings} actions={actions} />
        <div className="copyright">
          Created by <a target="_blank" href="https://steemit.com/@yjiq150">@yjiq150</a>, <a target="_blank" href="https://steemit.com/@kyunga">@kyunga</a>, <a target="_blank" href="https://steemit.com/@bramd">@bramd</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { settings: state.settings };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(SettingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
