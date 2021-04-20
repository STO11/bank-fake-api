'use strict'

const gql = require('graphql-tag')
const { print } = require('graphql/language/printer')
const axios = require('axios')
const { parseGraphQLJSON } = require('graphql-tools')
const { parseValue } = require('graphql')
const Env = use('Env')
const { test, trait } = use('Test/Suite')('Create')
trait('Test/ApiClient')
const Factory = use('Factory')
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
  response.assertText(response.text)
})
