<h1 align="center">
    <a href="#">🔗 Aplicação de transação de bancária </a>
</h1>

<p align="center">🚀 API de transação bancária para estudos (AdonisJS + Graphql + Docker + Testes) </p>

## Setup

- Para utilizar a api suba as containers docker:
```bash
docker-compose up -d
```

### Utilização

##

- Após subir a container deve-se aguardar os scripts de configuração e o run dos testes, após isso acessar o link http://127.0.0.1:3333] e aparecerá a mensagem no browser {"greeting":"Working!!"}


- Utilize o seguinte endpoint para as requests http://127.0.0.1:3333/bank
##


- Para você criar uma nova conta utilize o seguinte:
##
```bash
mutation {
    createAccount(username: "User Name", number: 4658629, email: "teste@email.com", password: "123456") {
      id
      username
      email,
      accounts {
        number
      }
    }
}
```
##
- Para você ver todas as contas:
##
```bash
query {
    allAccounts {
      id
      number
      balance
      user {
        id
        username
        email
      }
    }
}
```
##
- Para você ver o saldo da sua conta:
##
```bash
query {
    balance(conta: 4658629) {
      id
      balance
      user {
        username
      }
    }
}
```
##
- Para você sacar da sua conta:
##
```bash
mutation {
    withdraw(conta: 4658629, valor: 100) {
      id
      number
      balance,
      user {
        username
      }
    }
}
```
##
- Para você depositar em sua conta:
##
```bash
mutation {
    deposit(conta: 4658629, valor: 100.30) {
      id
      number
      balance,
      user {
        username
      }
    }
}
```
##
- Para rodar os testes você necessita entrar na container:
##
```bash
docker exec -it bank-nodejs /bin/bash
```
e rodar o comando
```bash
adonis test
```