'use strict'

const gql = require('graphql-tag')
const { print } = require('graphql/language/printer')
const axios = require('axios')
const Env = use('Env')
const { test, trait } = use('Test/Suite')('Withdraw')
trait('Test/ApiClient')
const Factory = use('Factory')
const url = `${Env.get('URL_TESTING')}/bank`;

const Exception = use('Exception')

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
  response.assertText(response.text)
})