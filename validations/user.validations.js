const Joi = require('joi');


const registerSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6).max(8)
        .required(),
    email: Joi.string()
        .email()
        .lowercase()
        .required(),
    role: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),


})
const businessValidation = Joi.object({
    businessName: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
    ownerName: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
    address: Joi.string()
        .min(5)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .lowercase()
        .required(),
    phoneNumber: Joi.string()
        .min(6).max(10)
        .required(),
    industry: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    website: Joi.string()
        .min(5)
        .required(),
    businessDescription: Joi.string()
        .min(5)
        .required(),
})
const customerValidation = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

})
const otpValidation = Joi.object({
    otp: Joi.string()
        .required(),

})
module.exports = {
    registerSchema,
    customerValidation,
    businessValidation,
    otpValidation
}