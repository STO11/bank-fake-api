'use strict'

const gql = require('graphql-tag')
const axios = require('axios')
const Env = use('Env')
const { test, trait } = use('Test/Suite')('Withdraw')
trait('Test/ApiClient')
const url = `${Env.get('URL_TESTING')}/bank`;


test('should withdraw in account', async ({ client, assert  }) => {
  const query = gql`
    mutation {
        withdraw(conta: 1234567, valor: 90) {
            id
            number
            balance,
            user {
                username
            }
        }
    }
  `
  const response =  await client.post(url).type('string').send({query: query}).end();
  response.assertStatus(200);
  assert.equal(response.text, '{"data":{"withdraw":{"id":1,"number":1234567,"balance":10.299999999999997,"user":{"username":"User Teste Name"}}}}');
})