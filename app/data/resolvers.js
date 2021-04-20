'use strict'
const User = use('App/Models/User')
const Accounts = use('App/Models/Accounts')
// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await User.all()
      return users.toJSON()
    },
    // Get a user by its ID
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    },
    // Fetch all accounts
    async allAccounts() {
      const accounts = await Accounts.all()
      return accounts.toJSON()
    },
    // Get a account by its id user
    async balance(_, { conta }) {
      const accont = await Accounts.query().where('number', conta).first();
      return accont
    }
  },

  Mutation: {
    // Handles user login for jwt
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)
      return token
    },
    //Create account
    async createAccount(_, { username, number, email, password }) {
      const user = await User.create({ username, email, password  });
      if(user) {
        await Accounts.create({user_id: user.id, number, balance: 0.0});
      }
      return user;
    },
    // Deposit account
    async deposit(_, { conta, valor }) {//, { auth } AUTH JWT
      try {
        if(valor < 1)
          throw new Error('(Required value) invalid value');
        // Check if user is logged in for JWT
        //await auth.check()
        //const user = await auth.getUser()
        const accountUser = await Accounts.query().from('accounts').where('number', conta).first();      
        if(accountUser) {
          accountUser.balance += parseFloat(valor);
          accountUser.save();
          return accountUser;
        }
        throw new Error('Did not find the account');
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async withdraw(_, { conta, valor }) {
      try {
        if(valor < 1)
          throw new Error('(Required value) invalid value');

        const accountUser = await Accounts.query().from('accounts').where('number', conta).first();      
        if(accountUser) {
          if(accountUser.balance < 1 || valor > accountUser.balance)
           throw new Error('Insufficient funds');

          accountUser.balance -= parseFloat(valor);
          if(accountUser.balance < 0)
            accountUser.balance = 0;
          accountUser.save();
          return accountUser;
        }
        throw new Error('Did not find the account');
      } catch (error) {
        throw new Error(error.message)
      }

    }
  },
  User: {
    async accounts(userInJson) {
      const user = new User()
      user.newUp(userInJson)
      const accounts = await user.accounts().fetch()
      return accounts.toJSON()
    }
  },
  Accounts: {
    async user(accountInJson) {
      const accont = new Accounts()
      accont.newUp(accountInJson)
      const user = await accont.user().fetch()
      return user.toJSON()
    }
  }
}

module.exports = resolvers;