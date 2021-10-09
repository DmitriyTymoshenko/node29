const {NotFound} = require('http-errors')

const validation = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error){
            throw new NotFound(error.message)
        }
        next();
    }
};

module.exports = validation;
