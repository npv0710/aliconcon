'ues strict'
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const { userRole } = require('../constants')
const crypto = require('crypto')
const KeyTokenService = require('./keytoken.service')
const { createTokenPair } = require('../utils/authUtils')

const { HttpStatusCodes, ErrorNames } = require("../constants")

const {
    BadRequestError,
    AuthenticationError
} = require('../core/error.response')

const { findUserByEmail } = require('./user.service')

class AccessService {
    static signin = async({ email, password, refreshToken = null }) => {
        const user = await findUserByEmail({ email })
        console.log('user signin: ', user)
        if (!user) throw new BadRequestError({ message: 'User not registered' })

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new AuthenticationError({ message: 'Invalid Credentials' })

        // generate public, private key
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        
        // generate token
        const tokens = await createTokenPair({ userId: user._id, email: user.email}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            publicKey, privateKey
        })

        return {
            user: '',
            tokens
        }
    }

    static signup = async ({ username, email, password, mobile }) => {
        // step1: check amail exists?
        const user = await userModel.findOne({ username }).lean()
        if (user) {
            throw new BadRequestError({ message: 'Username already registered!' })
        }

        const user2 = await userModel.findOne({ email }).lean()
        if (user2) {
            throw new BadRequestError({ message: 'Email already registered!' })
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
                user: newUser,
                tokens
            }
        }
    }
}

module.exports = AccessService
