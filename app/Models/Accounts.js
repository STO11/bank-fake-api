'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Accounts extends Model {

    /**
     * A post belongs to a user.
     *
     * @method user
     *
     * @return {Object}
     */
    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Accounts
