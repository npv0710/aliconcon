'ues strict'
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const { userRole } = require('../constants')
const crypto = require('crypto')
const KeyTokenService = require('./keytoken.service')
const { createTokenPair } = require('../utils/authUtils')

const {
    BadRequestError
} = require('../core/error.response')

class AccessService {

    static signup = async ({ username, email, password, mobile }) => {
        try {
            // step1: check amail exists?
            const user = await userModel.findOne({ username }).lean()
            if (user) {
                throw new BardRequestError('Username already registered!', 400)
            }

            const user2 = await userModel.findOne({ email }).lean()
            if (user2) {
                throw new BardRequestError('Email already registered!', 400)
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = await userModel.create({
                username, email, password: passwordHash, mobile, roles: [userRole.USER]
            })

            console.log(newUser)

            if (newUser) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })

                console.log({ privateKey, publicKey })

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey
                })

                console.log(publicKeyString);
                
                if (!publicKeyString) {
                    return {
                        code: 'xxx',
                        message: 'publicKeyString error'
                    }
                }

                const publicKeyObj = crypto.createPublicKey(publicKeyString)
                // create token pair
                const tokens = await createTokenPair({ userId: newUser._id, email }, publicKeyObj, privateKey)

                console.log('Tokens created success::', tokens)

                return {
                    code: 201,
                    metaData: {
                        user: newUser,
                        tokens
                    }
                }
            }
        }catch(err) {
            return {
                code: 'xxx',
                message: err.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService
