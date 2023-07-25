const Joi = require('joi');

const schema =Joi.object({
    user_Id: Joi.number().min(10000000).max(99999999),
    phoneNumber: Joi.number().min(1000000000).max(9999999999),
    signUpDate:Joi.date().iso(),
    loginDate:Joi.date().iso()
});

module.exports = schema;
