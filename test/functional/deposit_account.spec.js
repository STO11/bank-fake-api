'use strict'

const gql = require('graphql-tag')
const axios = require('axios')
const Env = use('Env')
const { test, trait } = use('Test/Suite')('Deposit')
trait('Test/ApiClient')
const url = `${Env.get('URL_TESTING')}/bank`;

test('should deposit in account', async ({ client, assert, faker }) => {
  const query = gql`
    mutation {
        deposit(conta: 1234567, valor: 100.30) {
          id
          number
          balance,
          user {
              username
          }
        }
    }
  `
  const response = await client.post(url).type('string').send({ query: query }).end();
  response.assertStatus(200);
  assert.equal(response.text, '{"data":{"deposit":{"id":1,"number":1234567,"balance":100.3,"user":{"username":"User Teste Name"}}}}');
})
