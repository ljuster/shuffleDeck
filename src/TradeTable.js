import React, { Component } from 'react';

class TradeTable extends Component {

  render() {
    return (
    <table className="trade-table">
      <caption>Trades</caption>
      <tbody>
        <tr align="center">
          {/* <th>Best Trade</th> */}
          <th>Date</th>
          <th>Time</th>
          <th>Original Investment</th>
          <th>Trade One</th>
          <th>Trade Two</th>
          <th>Trade Three</th>
          <th>Trade Four</th>
          <th>Profit</th>
        </tr>
      </tbody>
    </table>
  )}
}


export default (TradeTable);
