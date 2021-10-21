const {Schema , model} =  require("mongoose")
const Joi = require('joi');
const phoneValidation = /^[+]?[0-9]{10,14}$/
const emailValidation = /^\S+@\S+\.\S+$/
const contactSchema = Schema({
    name : {
        type : String,
        required: [true, 'Set name for contact'],
        minLength : 2,
        maxLength : 20
    },
    email : {
        type : String,
        unique : true,
        required: true,
        maxLength : 30,
        validate : emailValidation
    },
    phone : {
        type : String,
        unique : true,
        required: true,
        validate : phoneValidation
    },
    favorite : {
        type : Boolean,
        default : false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
} , {versionKey: false, timestamps: true})

const JoiSchema = Joi.object().keys({
    name: Joi.string()
        .min(2)
        .max(20).required().messages({
            'any.required' : 'Set name for contact'
        }),
    email: Joi.string().max(30).pattern(emailValidation).required(),
    phone: Joi.string().pattern(phoneValidation).required(),
    favorite : Joi.boolean()
})

const Contact = model('contact' , contactSchema)

module.exports = {Contact , JoiSchema }
