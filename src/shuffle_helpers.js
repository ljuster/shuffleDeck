// // Example: This should return true
// var isUnderscoreShuffleFair = isShuffleFair(_.shuffle);
//
// if (!isUnderscoreShuffleFair) {
//   console.error("Underscorejs's shuffle function is definitely fair.");
// }
// // Example: This should return false
// clearlyUnfairShuffle = function (array) { return array; };
// var isClearlyUnfairShuffleFair = isShuffleFair(clearlyUnfairShuffle);
// if (isClearlyUnfairShuffleFair) {
//   console.error("A shuffle function that returns the array you gave it is definitely unfair.");
// }
// // This should also return false
// anotherClearlyUnfairShuffle = function(array) {
//   return ([].concat(array)).sort(function(a, b) {
//     return a-b;
//   });
// };
// var isAnotherClearlyUnfairShuffleFair = isShuffleFair(anotherClearlyUnfairShuffle);
// if (isAnotherClearlyUnfairShuffleFair) {
//   console.error("A shuffle function that sorts the array is definitely unfair");
// }
// // What if the shuffle tries to detect that it's being tested?
// var lastArray;
// var lastFairShuffle;
// trickyShuffle = function (array) {
//   var isInTestingEnvironment = false;
//
//   // Am I being given the same array over and over again?
//   if (_.isEqual(lastArray, array)) {
//     isInTestingEnvironment = true;
//   }
//
//   // Am I being given an array that is sorted somehow, like the elements 0 through 51?
//   if (_.isEqual(array, ([].concat(array)).sort(function (a, b) {return a-b;}))) {
//     isInTestingEnvironment = true;
//   }
//
//   // Am I being fed my own last fair shuffle?
//   if (_.isEqual(lastFairShuffle, array)) {
//     isInTestingEnvironment = true;
//   }
//
//   lastArray = [].concat(array); // Clone the array into the last array
//
//   // Am I in a testing environment?
//   if (isInTestingEnvironment) {
//     // Do a fair shuffle, to trick you into thinking I'm a fair shuffle when I really am not
//     lastFairShuffle = _.shuffle(array);
//     return [].concat(lastFairShuffle); // This weird syntax clones an array
//   } else {
//     return ([].concat(array)).sort(); // Do a clearly unfair shuffle
//   }
// };
import { uniq, sumBy, range, shuffle, isEmpty } from 'lodash'

export const createSortedDeck = (len) => {
  let deck = new Array(len).fill(0,0)

  range(0,len).map(val => deck[val] = val)
  return deck
}

export const calculateEntropy = (deck) => {
  // Shannon entropy
  // https://medium.com/udacity/shannon-entropy-information-gain-and-picking-balls-from-buckets-5810d35d54b4
  const deckSize = deck.length
  let buckets = new Array(deckSize).fill(0,0)
  let diff

  deck.forEach((cardVal, idx) => {
    diff = cardVal - deck[(idx + 1) % deckSize]
    buckets[diff > 0 ? diff : diff + deckSize] += 1
  })
  // Normalization by adding and/or multiplying by constants
  // so values fall between 0 and 1. Probability Density Functions
  const normalizedBucketVals = buckets.map((bucket) => bucket/deckSize)
  // we take the sum of the logs to make entropy calculation more manageable
  // log space condenses relationships proportionally
  return -1 * sumBy(normalizedBucketVals, (val) => val > 0 ? Math.log(val)*val : 0)
}

export const isShuffleFair = (shuffleFunc, len) => {
  let startDeck = createSortedDeck(len)

  const results = range(0,20).map((val) => {
    const shuffledDeck = shuffleFunc(flipTwoVals(startDeck, val))

    return { entropy: calculateEntropy(shuffledDeck) }
  })

  // entropy vals did not appear consistently above 3 until deck size > 40
  const somewhatArbitraryThreshold = calcThreshold(len)
  const entropyValsDistinct = uniq(results.map(res => res.entropy)).length/results.length > .85
  const entropyValsAboveThreshold = results.filter(res => res.entropy > somewhatArbitraryThreshold)

  return entropyValsDistinct && (entropyValsAboveThreshold.length/results.length > .85)
}

export const flipTwoVals = (deck, val) => {
  let i,temp
  i = Math.floor(Math.random() * deck.length)
  temp = deck[val]
  deck[val] = deck[i]
  deck[i] = temp
  return deck
}

// https://bost.ocks.org/mike/shuffle/
export const fisherYatesShuffle = (deck) => {
  let m = deck.length
  let i, t;

  while (m > 0) {
    i = Math.floor(Math.random() * m--)
    t = deck[m]
    deck[m] = deck[i]
    deck[i] = t
  }
  return deck
}

export const calcThreshold = (size) => {
  if (size < 10) return 1
  if (size < 20) return 1.5
  if (size < 30) return 2
  if (size < 41) return 2.5
  return 3
}