import React, { Component } from 'react';

class Histogram extends Component {

  render() {
    return (
      <table className="deck-table">
        <caption>Real Time Exchange Rates </caption>
        <tbody>
          <tr align="center">
            <th>base &#8595;</th>
            <th>USD</th>
            <th>AUD</th>
            <th>EUR</th>
            <th>JPY</th>
            <th>GBP</th>
          </tr>
        </tbody>
        <tbody>
          <tr align="center">
            <th>USD</th>
          </tr>
        </tbody>
        <tbody>
          <tr align="center">
            <th>AUD</th>
          </tr>
        </tbody>
        <tbody>
          <tr align="center">
            <th>EUR</th>
          </tr>
        </tbody>
        <tbody>
          <tr align="center">
            <th>JPY</th>
          </tr>
        </tbody>
        <tbody>
          <tr align="center">
            <th>GBP</th>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default (Histogram);
