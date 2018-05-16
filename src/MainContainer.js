import React, { Component } from 'react';
import CurrencyRates from './CurrencyRates'
import Inputs from './Inputs'
import TradeTable from './TradeTable'
import API_KEY from './config.js';

// Anna, I put this here because now it is reachable by tests
export const createTradePermutations = (deck) => {
  let fourArrays = Shuffle([deck])
  let threeArrays = fourArrays.map(array => {
    return array.slice(0,3)
  })
  let twoArrays = threeArrays.map(array => {
    return array.slice(0,2)
  })
  let allArrays = [...fourArrays, ...threeArrays, ...twoArrays]
  return allArrays
}

export const Shuffle = (deck) => {
  var m = deck.length
  let i, t;

  while (m > 0) {
    i = Math.floor(Math.random() * m--)
    t = deck[m]
    deck[m] = deck[i]
    deck[i] = t
  }
  return deck
}

class MainContainer extends Component {
  constructor (props) {
      super(props)
      this.state = {
        deck: [
          1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
          26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52
        ]
      }
    }

  componentDidMount = () => {

  }

  componentWillReceiveProps = () => {

  }

  clearPreviousTrades = () => {
    this.setState({successfulTrades: []})
  }

  updateMaxInvestment = (input) => {
    let onlyNumbers = input.replace(/\D/g, '');
    this.setState({maxInvestment:onlyNumbers})
  }

  updateTrade = () => {
    this.setState({trade:!this.state.trade}, ()=>this.startTrades())
  }

  refreshRates = () => {
    console.log("in refresh")
  }

  changeBaseCurrency = (currency) => {
    this.setState({baseCurrency:currency, baseCurrencySymbol:'lkjjk'})
  }

  startTrades = () => {
    if (this.state.trade){
      let successfulTradePermutations = this.state.tradePermutations.reduce((acc, permutation) => {
        const successfulTrade = this.tradeMagic(permutation);
        if (successfulTrade) {
          acc.unshift(successfulTrade);
        }
        return acc;
      }, []);
      this.setState({
        successfulTrades: [...this.state.successfulTrades, ...successfulTradePermutations]
      });
    }
  }

  tradeMagic = (currencyPermutation) => {
    let baseCurrency = this.state.baseCurrency
    let currentCurrency = this.state.currentCurrency
    let currentMoney = this.state.maxInvestment

    for (let i=0;i<=currencyPermutation.length;i++){
      if (i === 0) {
        currentMoney *= this.state[baseCurrency][currencyPermutation[0]]
        currentCurrency = currencyPermutation[0]
      } else if (i !== currencyPermutation.length && i !== 0) {
        currentMoney *= this.state[currentCurrency][currencyPermutation[1]]
        currentCurrency = currencyPermutation[1]
      } else if(i === currencyPermutation.length){
        currentMoney *= this.state[currentCurrency][baseCurrency]
      } else {
          console.log("error in trademagic")
      }
    }

    let roundedProfits = parseFloat(Math.round((currentMoney-this.state.maxInvestment) * 100) / 100).toFixed(2);
    if (roundedProfits>0){
      let newObject = {best: false, time:this.state.timeOfLastFetch, currencyPermutation:currencyPermutation, profits:roundedProfits, originalInvestment:this.state.maxInvestment, baseCurrencySymbol:this.state.baseCurrencySymbol}
      return newObject;
    } else{
      console.log("no trade")
    }
  }

  render() {
    return (
      <div className="main-container">
        <h2>Shuffle Simulation</h2>
        <div className= "top-row">
        <ul>
          {this.state.deck.map(val => <li>{val}</li>)}
        </ul>
        <ul>
          {Shuffle(this.state.deck).map(val => <li>{val}</li>)}
        </ul>
          <Inputs startTrades = {this.startTrades}
                  maxInvestment = {this.state.maxInvestment}
                  updateMaxInvestment = {this.updateMaxInvestment}
                  trade = {this.state.trade}
                  updateTrade = {this.updateTrade}
                  successfulTrades = {this.state.successfulTrades}
                  changeBaseCurrency = {this.changeBaseCurrency}
                  baseCurrency = {this.state.baseCurrency}
                  clearPreviousTrades = {this.clearPreviousTrades}
                  baseCurrencySymbol = {this.state.baseCurrencySymbol}
                  refreshRates = {this.refreshRates}
          />
          <CurrencyRates USD= {this.state.USD}
                         EUR= {this.state.EUR}
                         GBP= {this.state.GBP}
                         AUD= {this.state.AUD}
                         JPY= {this.state.JPY}
          />

        </div>
        <div className = "bottom-row">
          <TradeTable successfulTrades= {this.state.successfulTrades}
                      baseCurrencySymbol = {this.state.baseCurrencySymbol}
          />
        </div>
      </div>
    );
  }
}

export default (MainContainer);
