'use strict'

const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            /** Save key when using crypto.generateKeyPairSync */
            // const publicKeyString = publicKey.toString()
            // const keyToken = await keyTokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString,
            //     privateKey: privateKey
            // })
            // return keyToken ? keyToken.publicKey : null
            const filter = { user: userId}
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken }
            const options = { upsert: true, new: true}

            const keyToken = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return keyToken ? keyToken.publicKey : null

        }catch (err) {
            console.log(err)
            return err
        }
    }
}

module.exports = KeyTokenService