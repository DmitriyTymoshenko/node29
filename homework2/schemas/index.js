const Joi = require('joi');

const JoiSchema = Joi.object().keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().required()
})

module.exports = {JoiSchema}
