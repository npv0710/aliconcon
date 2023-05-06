'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'
// Declare the Schema of the Mongo model
var userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        maxLength: 150
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: ['user']
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);