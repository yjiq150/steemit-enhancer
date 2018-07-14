import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { zeroPadding } from '../common/util';

export default class LineTemplateList extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const lines = [
      'https://steemitimages.com/80x0/https://cdn.steemitimages.com/DQmeBM8uYHoA6vNfhKWffgTb2GsuB4iBZwWWV4hESwi4gTg/border_05.png',
      'https://cdn.steemitimages.com/150x0/https://cdn.steemitimages.com/DQmeBM8uYHoA6vNfhKWffgTb2GsuB4iBZwWWV4hESwi4gTg/border_05.png',
      'https://cdn.steemitimages.com/400x0/https://cdn.steemitimages.com/DQmUScNJSMXBLyHum3oCogqKZGsvSJ2WzobgnVmsQej3iQ8/border.png',
      'https://cdn.steemitimages.com/DQmVUVxegmUjKVYgsL6F4h1mZzmpYtoRA9tZFT39zgLLoV8/border.png',
      'https://cdn.steemitimages.com/DQmUgbfHXWonFbFHYpjEejDkC1pfjvgkLXSKhCDddbRwY6X/border_2.png',
      'https://cdn.steemitimages.com/DQmY8UA7YC68Lhh6cLFzdAESxuG8eaonPdPwKcVyEBieXK5/border_06.png',
      'https://cdn.steemitimages.com/DQmeBM8uYHoA6vNfhKWffgTb2GsuB4iBZwWWV4hESwi4gTg/border_05.png'
    ];

    const { numbers, onClick } = this.props;

    const listItems = numbers.map((number) => {
      const templateImage = require(`../../assets/img/layoutEnhancer/line_${zeroPadding(number, 2)}.png`);

      return (
        <div className="item" key={number.toString()} onClick={() => onClick(lines[number - 1])}>
          <img src={templateImage} />
        </div>
      );
    });

    return (
      <div className="items lineTemplate">{listItems}</div>
    );
  }
}
