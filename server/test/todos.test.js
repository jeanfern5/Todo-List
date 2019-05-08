//Todos Mocha Testing

const  assert = require('assert');
// const getTodos = require('../components/resolvers/todos');

describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

// describe('getTodos', function() {

//   describe('#checkAuth()', function() {
//     it("should return req.isAuth = true and req.userId with user's id", function() {
//       expect(checkAuth(req)).to.equal('')
//     });
//   });
// });