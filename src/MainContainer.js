import React, { Component } from 'react';
import { sumBy, range } from 'lodash';
import Plot from 'react-plotly.js';
import {
  table
} from 'table';
import Histogram from './Histogram'
import DeckMap from './DeckMap'

var plotly = require('plotly')("ljuster", "QhKIUAYElnloRFBpOILd")

export const Shuffle = (deck) => {
  // let shuffledDeck = deck.slice()
  var m = deck.length
  let i, t;

  // while (m > 0) {
  //   i = Math.floor(Math.random() * m--)
  //   t = shuffledDeck[m]
  //   shuffledDeck[m] = shuffledDeck[i]
  //   shuffledDeck[i] = t
  // }
  // return shuffledDeck
  while (m > 0) {
    i = Math.floor(Math.random() * m--)
    t = deck[m]
    deck[m] = deck[i]
    deck[i] = t
  }
  return deck
}

export const CalculateEntropy = (deck) => {
  // Shannon entropy
  let buckets = new Array(52).fill(0,0)
  let diff

  deck.forEach((cardVal, idx) => {
    diff = cardVal - deck[(idx + 1)%52]
    buckets[diff > 0 ? diff : diff + 52] += 1
  })
  console.log(buckets.map((bucket) => bucket/52))
  // Normalization by adding and/or multiplying by constants
  // so values fall between 0 and 1. Probability Density Functions
  const normalizedBucketVals = buckets.map((bucket) => bucket/52)
  // we take the sum of the logs to make entropy calculation more manageable
  // log space condenses relationships proportionally
  // https://medium.com/udacity/shannon-entropy-information-gain-and-picking-balls-from-buckets-5810d35d54b4
  const entropy = -1 * sumBy(normalizedBucketVals, (val) => val > 0 ? Math.log(val)*val : 0)
  console.log('entropy', entropy)
  return entropy
}

class MainContainer extends Component {
  constructor (props) {
      super(props)
      this.state = {
        deck: [
          0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
          26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51
        ]
      }
    }

  render() {
    return (
      <div className="main-container">
        <h2>Shuffle Simulation</h2>
        <div className="deck-table">
        {table([this.state.deck, Shuffle(this.state.deck)])}
        </div>
        <div className= "top-row">
        Entropy Val: {CalculateEntropy(this.state.deck)} <br/>
        Shuffled Entropy Val: {CalculateEntropy(Shuffle(this.state.deck))} <br/>
        Shuffled Shuffle Entropy Val: {CalculateEntropy(Shuffle(Shuffle(this.state.deck)))}
        {range(10, CalculateEntropy(Shuffle(this.state.deck)))}
        </div>
        <div className = "bottom-row">
          <DeckMap
            successfulTrades= {this.state.successfulTrades}
            baseCurrencySymbol = {this.state.baseCurrencySymbol}
          />
        </div>
      </div>
    );
  }
}

export default (MainContainer);
