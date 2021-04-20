'use strict'

const gql = require('graphql-tag')
const axios = require('axios')
const Env = use('Env')
const { test, trait } = use('Test/Suite')('Create')
trait('Test/ApiClient')
const url = `${Env.get('URL_TESTING')}/bank`;

test('should created new account', async ({ client, assert, faker  }) => {
  const query = gql`
    mutation {
      createAccount(username: "User Teste Name", number: 1234567, email: "teste2@email.com", password: "123456") {
        id
        username
        email,
        accounts {
          number
        }
      }
    }
  `
  const response =  await client.post(url).send({query: query}).end();
  response.assertStatus(200);
  assert.equal(response.text, '{"data":{"createAccount":{"id":1,"username":"User Teste Name","email":"teste2@email.com","accounts":[{"number":1234567}]}}}');
})
