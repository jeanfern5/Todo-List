//Users Mocha Testing

const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:8080`;
const request = require('supertest');
const fetch = require('node-fetch')

// const users = require('../components/resolvers/users');

// describe('Array', function() {
//     describe('#indexOf()', function() {
//       it('should return -1 when the value is not present', function() {
//         assert.equal([1, 2, 3].indexOf(4), -1);
//       });
//     });
//   });

desc = function(){
describe('GraphQL', () => {
    it('Fetch Todos',  (done) => {
        const result =  request(url)
        .post('/graphql')
        .send({query: `
            mutation {
                signupUser(userInput: { email: "test3@gmail.com", password: "Test1234" }) {
                    _id
                    email
                    awsId
                }
            }
      `})
        .end((err, res) => {
            
             console.log('---->')
         })
     

        // console.log('result ', done())

     });

  });
}

