import { range, shuffle, isEqual} from 'lodash'
import { table } from 'table'
import { isShuffleFair, createSortedDeck, calculateEntropy, fisherYatesShuffle } from './shuffle_helpers'

describe('evidence for entropy and distinct thresholds', () => {
  const entropyValsPerDeckSize = [
    range(1,53).map(val => `${val}: ${calculateEntropy(shuffle(createSortedDeck(val))).toFixed(3)}` ),
    range(1,53).map(val => `${val}: ${calculateEntropy(shuffle(createSortedDeck(val))).toFixed(3)}` ),
    range(1,53).map(val => `${val}: ${calculateEntropy(shuffle(createSortedDeck(val))).toFixed(3)}` )
  ]

  console.log(table(entropyValsPerDeckSize.map(arr => arr.slice(0,15))))
  console.log(table(entropyValsPerDeckSize.map(arr => arr.slice(15,25))))
  console.log(table(entropyValsPerDeckSize.map(arr => arr.slice(25,35))))
  console.log(table(entropyValsPerDeckSize.map(arr => arr.slice(35,45))))
  console.log(table(entropyValsPerDeckSize.map(arr => arr.slice(45,52))))
})

describe('unfairShuffle funcs', () => {
  const clearlyUnfairShuffle = function (array) { return array }
  const anotherClearlyUnfairShuffle = function (array) {
    return ([].concat(array)).sort(function(a, b) {
      return a-b
    })
  }

  let lastArray
  let lastFairShuffle
  const trickyShuffle = function (array) {
    let isInTestingEnvironment = false

    // Am I being given the same array over and over again?
    if (isEqual(lastArray, array)) {
      isInTestingEnvironment = true
    }

    // Am I being given an array that is sorted somehow, like the elements 0 through 51?
    if (isEqual(array, ([].concat(array)).sort(function (a, b) {return a-b }))) {
      isInTestingEnvironment = true
    }

    // Am I being fed my own last fair shuffle?
    if (isEqual(lastFairShuffle, array)) {
      isInTestingEnvironment = true
    }

    lastArray = [].concat(array) // Clone the array into the last array

    // Am I in a testing environment?
    if (isInTestingEnvironment) {
      // Do a fair shuffle, to trick you into thinking I'm a fair shuffle when I really am not
      lastFairShuffle = shuffle(array)
      return [].concat(lastFairShuffle) // This weird syntax clones an array
    } else {
      return ([].concat(array)).sort() // Do a clearly unfair shuffle
    }
  }

  it('should return false', () => {
    expect(isShuffleFair(clearlyUnfairShuffle, 52)).toEqual(false)
    expect(isShuffleFair(anotherClearlyUnfairShuffle, 52)).toEqual(false)
    expect(isShuffleFair(trickyShuffle, 52)).toEqual(false)
  })
})

describe('fisherYatesShuffle func', () => {
  it('should return true', () => {
    expect(isShuffleFair(fisherYatesShuffle, 52)).toEqual(true)
  })
})

describe('underScore Shuffle func', () => {
  it('should return true', () => {
    expect(isShuffleFair(shuffle, 52)).toEqual(true)
  })
})
