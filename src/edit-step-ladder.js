var esl = {};

exports.MaxEditStepLadder = esl.MaxEditStepLadder = function (input) {

  /**
   * Calculate the maximum edit steps for any chain of transforms. A brute force approach of testing all possible modifications of each word in the input list is used. Because the words are ordered, a binary search may be used to more efficiently determine if a modified word is present elsewhere in the list.
   * @param {string} input - List of space delimited words
   */
  this.init = function (input) {
    var chars = 'abcdefghijklmnopqrstuvwxyz'.split('')
      , list
      , curWord
      , curWordLength
      , newWord
      , f
      , i
      , j
      , k
      , newWordIndex
      , n
      , steps
      , max = 0
      ;

    if (typeof input !== 'string') {
      return false;
    }

    list = input.trim().split(/\s+/);
    n = list.length;
    steps = new Array(n + 1);

    steps[0] = 1;

    for (i = 1; i < n; i++) {
      steps[i] = 1;
      curWord = list[i];
      curWordLength = list[i].length;

      for (f = 0; f < 3; f++) {
        for (j = 0; j < curWordLength; j++) {
          for (k = 0; k < 26; k++) {
            newWord = this.transform(curWord, chars[k], j, f);

            if (curWord < newWord) {
              break;
            }

            newWordIndex = bsearch.call(list, newWord, i);

            if (newWordIndex !== -1 && steps[i] < steps[newWordIndex] + 1) {
              steps[i] = steps[newWordIndex] + 1;
            }
          }
        }
      }

      for (k = 0; k < 26; k++) {
        newWord = this.transform(curWord, chars[k], curWordLength, 0);

        if (curWord < newWord) {
          break;
        }

        newWordIndex = bsearch.call(list, newWord, i);

        if (newWordIndex !== -1 && steps[i] < steps[newWordIndex] + 1) {
          steps[i] = steps[newWordIndex] + 1;
        }
      }

      if (steps[i] > max) {
        max = steps[i];
      }
    }

    return max;
  };

  /**
   * Add a character to a word at specified index
   * @param {string} word - Word to modify
   * @param {string} c - Character to insert
   * @param {number} i - Index at which to insert
   * @returns {string} Modified word
   */
  this.insert = function (word, c, i) {
    return word.substring(0, i) + c + word.substring(i);
  };

  /**
   * Remove a character from a word at specified index
   * @param {string} word - Word to modify
   * @param {number} i - Index at which to remove character
   * @returns {string} Modified word
   */
  this.del = function (word, i) {
    return word.substring(0, i) + word.substring(i + 1);
  };

  /**
   * Change a character in a word at specified index
   * @param {string} word - Word to modify
   * @param {string} c - Replacement character
   * @param {number} i - Index at which to change
   * @returns {string} Modified word
   */
  this.change = function (word, c, i) {
    return word.substring(0, i) + c + word.substring(i + 1);
  };

  /**
   * Modify a word using specified character, index, and method
   * @param {string} word - Word to modify
   * @param {string} c - Character to use for modification
   * @param {number} i - Index at which to modify
   * @param {number} f - Case flag
   * @returns {string} Modified word
   */
  this.transform = function (word, c, i, f) {
    switch (f) {
      case 0:
        return this.insert(word, c, i);
      case 1:
        return this.del(word, i);
      default:
        return this.change(word, c, i);
    }
  };

  /**
   * Perform a binary search on an array
   * @param {string} needle - Word to look for
   * @param {number} end - Stop index
   * @returns {number} -1 if needle is not found, index of needle in the array otherwise
   */
  function bsearch (needle, end) {
    var mid
      , left = 0
      , right = end - 1
      ;

    while (left <= right) {
      mid = (left + right) / 2 | 0;

      if (needle > this[mid]) {
        left = mid + 1;
      } else if (needle < this[mid]) {
        right = mid - 1;
      } else {
        return mid;
      }
    }

    return -1;
  }

  console.log(this.init(input));
};

var readline = require('readline')
  , rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  ;

rl.question('Enter a list of space delimited words from which to calculate the maximum edit step ladder length: ', function (input) {
  esl.MaxEditStepLadder(input);
  rl.close();
});
