import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { zeroPadding } from '../common/util';

export default class QuotationTemplateList extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { numbers, onClick } = this.props;

    const listItems = numbers.map((number) => {
      const templateImage = require(`../../assets/img/layoutEnhancer/quotation_${zeroPadding(number, 2)}.png`);
      const template = require(`./layout/quotation_${zeroPadding(number, 2)}`);

      return (
        <div className="item" key={number.toString()} onClick={() => onClick(template)}>
          <img src={templateImage} />
        </div>
      );
    });

    return (
      <div className="items quotationTemplate">{listItems}</div>
    );
  }
}
