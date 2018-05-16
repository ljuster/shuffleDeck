import React, { Component } from 'react';

export const SUITS = [<h5>&#9824;</h5>, <h5>&#9829;</h5>, <h5>&#9827;</h5>, <h5>&#9830;</h5>]
export const CARD_VALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'J', 'Q', 'K', 'A']
export const Mapped = () => {
  return CARD_VALS.map((val) => (
    <div>{SUITS[0]}{val}{SUITS[1]}{val}{SUITS[2]}{val}{SUITS[3]}{val}</div>
  ))
}
class DeckMap extends Component {

  render() {
    return (
      <div>{Mapped()}</div>
  )}
}


export default (DeckMap);
