import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { zeroPadding } from '../common/util';

export default class LayoutTemplateList extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const titles = [
      'Book Review',
      'Travel',
      'Newsletter',
      'Image Archive',
      'Recipe',
      'Essay',
    ];

    const { numbers, onClick } = this.props;

    const listItems = numbers.map((number) => {
      const templateImage = require(`../../assets/img/layoutEnhancer/template_${zeroPadding(number, 2)}.png`);
      const template = require(`./layout/template_${zeroPadding(number, 2)}`);

      return (
        <div className="item" key={number.toString()} onClick={() => onClick(template)}>
          <img src={templateImage} />
          <p>{titles[number - 1]}</p>
        </div>
      );
    });

    return (
      <div className="items layoutTemplate">{listItems}</div>
    );
  }
}
