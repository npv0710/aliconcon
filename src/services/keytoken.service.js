'use strict'

const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString()
            console.log('public key: ');
            console.log(publicKeyString)
            const keyToken = await keyTokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })
            
            return keyToken ? keyToken.publicKey : null
        }catch (err) {
            console.log(err)
            return err
        }
    }
}

module.exports = KeyTokenService