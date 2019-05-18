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

describe('GraphQL', () => {
    it('Fetch Todos',  (done) => {
        request(url)
        .post('/graphql')
        .send({query: `
            mutation {
                signupUser(userInput: { email: "test1@gmail.com", password: "Test1234" }) {
                    _id
                    email
                    awsId
                }
            }
      `})
        .end((err, res) => {
            
             console.log('---->', res.body)
             done();
         })
     

        // console.log('result ', done())

     });

  });


