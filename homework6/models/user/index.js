const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const emailValidation = /^\S+@\S+\.\S+$/
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const userSchema = Schema({
  password: {
    type: String,
    minLength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: emailValidation,
    unique: true,
  },
  avatarUrl: {
    type: String
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createAvatar = function (email) {
  this.avatarUrl = gravatar.url(email)
}

userSchema.methods.setVerificationToken = function () {
  this.verifyToken = nanoid()
}
const JoiSchema = Joi.object().keys({
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required'
  }),
  email: Joi.string().pattern(emailValidation).required().messages({
    'any.required': 'Email is required'
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  token: Joi.string()
})

const JoiSubscriptionSchema = Joi.object().keys({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
})

const User = model('user', userSchema)

module.exports = { User, JoiSchema, JoiSubscriptionSchema }
