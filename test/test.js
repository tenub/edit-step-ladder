var assert = require('assert')
  , esl = require('../src/edit-step-ladder.js')
  ;

describe('esl', function() {
  esl.MaxEditStepLadder();
  describe('#init()', function () {
    it('should return false when word list is empty', function () {
      assert.equal(false, esl.init());
    });

    it('should return 0 when word list is "cat"', function () {
      assert.equal(0, esl.init('cat'));
    });

    it('should return 4 when word list is "cat dig dog fig fin fine fog log"', function () {
      assert.equal(4, esl.init('cat dig dog fig fin fine fog log'));
    });

    it('should return 5 when word list is "cat dig dog fig fin fine fog log wine"', function () {
      assert.equal(5, esl.init('cat dig dog fig fin fine fog log wine'));
    });
  });

  describe('#insert()', function () {
    it('should return "asdf" when word is "asd" and "f" is inserted in last position', function () {
      assert.equal('asdf', esl.insert('asd', 'f', 3));
    });

    it('should return "fasd" when word is "asd" and "f" is inserted in first position', function () {
      assert.equal('fasd', esl.insert('asd', 'f', 0));
    });

    it('should return "agsd" when word is "asd" and "g" is inserted after first character', function () {
      assert.equal('agsd', esl.insert('asd', 'g', 1));
    });
  });

  describe('#del()', function () {
    it('should return "asd" when word is "asdf" and last character is removed', function () {
      assert.equal('asd', esl.del('asdf', 3));
    });
  });

  describe('#change()', function () {
    it('should return "asdf" when word is "asdf" and last character is changed to "f"', function () {
      assert.equal('asdf', esl.change('asdf', 'f', 3));
    });

    it('should return "fsdf" when word is "asdf" and first character is changed to "f"', function () {
      assert.equal('fsdf', esl.change('asdf', 'f', 0));
    });

    it('should return "agdf" when word is "asdf" and second character is changed to "g"', function () {
      assert.equal('agdf', esl.change('asdf', 'g', 1));
    });
  });

  describe('#transform()', function () {
    it('should return "asdf" when word is "asd" and "f" is inserted in last position', function () {
      assert.equal('asdf', esl.transform('asd', 'f', 3, 0));
    });

    it('should return "asd" when word is "asdf" and last character is removed', function () {
      assert.equal('asd', esl.transform('asdf', 'g', 3, 1));
    });

    it('should return "agdf" when word is "asdf" and second character is changed to "g"', function () {
      assert.equal('agdf', esl.transform('asdf', 'g', 1, 2));
    });
  });
});