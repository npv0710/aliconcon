const user = require('../models/user.model')

const findUserByEmail = async({ email, select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1
}}) => {
    return await user.findOne({ email }).select(select).lean().exec()
}

module.exports = {
    findUserByEmail
}