import {range, shuffle} from 'lodash'
import { isShuffleFair, createSortedDeck, calculateEntropy, Shuffle } from './math_helpers'

// // Example: This should return true
// var isUnderscoreShuffleFair = isShuffleFair(_.shuffle);

describe('underScore Shuffle func', () => {
  it('should return true', () => {
    expect(isShuffleFair(shuffle, 100)).toEqual(true)
  })
})

describe('decks that should fail', () => {
  let sortedDeck = createSortedDeck(52)
  // const shuffledEntropyVals = range(1,53).map(val => `${val}: ${calculateEntropy(Shuffle(createSortedDeck(val)))}` )
  // console.log('shuffled entropy vals for size 1 - 53', shuffledEntropyVals)

  it('should return an entropy value below the threshold (3)', () => {
    expect(calculateEntropy(sortedDeck)).toBeLessThan(3)
  })

  const oneSplit = [1,3,2,4,5,7,6,7,8,9,10,11,12,13,14,15,16]

  it('should return an entropy value below the threshold (3)', () => {
    // console.log('split1', calculateEntropy(oneSplit))
    expect(calculateEntropy(oneSplit)).toBeLessThan(3)
  })

  it('should return an entropy value below the threshold (3)', () => {
    // console.log('split2', calculateEntropy(Shuffle(oneSplit)))
    expect(calculateEntropy(oneSplit)).toBeLessThan(3)
  })
})
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