const {Schema, model, SchemaTypes} =  require("mongoose")
const Joi = require('joi');
const bcrypt = require("bcrypt");
const emailValidation = /^\S+@\S+\.\S+$/
const userSchema = Schema({
    password: {
        type: String,
        minLength : 6,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate : emailValidation,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
} , {versionKey: false, timestamps: true})

// userSchema.methods.setPassword = (password) => this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const JoiSchema = Joi.object().keys({
    password : Joi.string().min(6).required().messages({
        'any.required' : 'Password is required'
    }),
    email: Joi.string().pattern(emailValidation).required().messages({
        'any.required' : 'Email is required'
    }),
    subscription : Joi.string().valid("starter", "pro", "business"),
    token : Joi.string()
})

const User = model('user' , userSchema)

module.exports = {User , JoiSchema}
