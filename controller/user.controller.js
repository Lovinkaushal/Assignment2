const userSchema = require("../Schemas/userSchema");
const businessSchema = require("../Schemas/businessSchema");
const customerSchema = require("../Schemas/customerSchema");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const { registerSchema, businessValidation, customerValidation, otpValidation } = require("../validations/user.validations");

module.exports.admin = async ({ name, email, password, role }) => {
    try {
        let { error, value } = registerSchema.validate({ name, email, password, role });
        if (error) {
            throw new Error(error.message);
        }
        value.password = await bcrypt.hash(value.password, 10);
        let user = await userSchema.create({
            ...value
        });
        let token
        if (user) {
             token = jwt.sign({ _id: user._id },
                'dummy text',
                {
                    expiresIn: "24h"
                }
            )
        }
        return {
            message: 'success',
            status: 201,
            user,
            token: token
        }
    } catch (error) {
        throw error;
    }
}
module.exports.business = async ({ businessName, ownerName, address, email, phoneNumber, industry, website, businessDescription }) => {
    try {
        let { error, value } = businessValidation.validate({ businessName, ownerName, address, email, phoneNumber, industry, website, businessDescription });
        if (error) {
            throw new Error(error.message);
        }
        let user = await businessSchema.create({
            ...value
        });
        let token
        if (user) {
             token = jwt.sign({ _id: user._id },
                'dummy text',
                {
                    expiresIn: "24h"
                }
            )
        }
        return {
            message: 'success',
            status: 201,
            user,
            token:token
        }
    } catch (error) {
        throw error;
    }
}

module.exports.customer = async ({ name, email }) => {
    try {
        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        let { error, value } = customerValidation.validate({ name, email });
        if (error) {
            throw new Error(error.message);
        }
        let user = await customerSchema.create({
            ...value
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 3000,
            secure: true,
            auth: {
                user: 'cbllovinkaushal@gmail.com',
                pass: 'uqqxzrlbtozhrsmf'
            },
        });
        let mailOptions = await transporter.sendMail({
            from: 'cbllovinkaushal@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: otp
        });
        let otpsave = await customerSchema.findByIdAndUpdate(user._id, { $set: { otp: otp } }, { new: true });
        let token
        if (user) {
             token = jwt.sign({ _id: user._id },
                'dummy text',
                {
                    expiresIn: "24h"
                }
            )
        }

        return {
            message: 'success',
            status: 201,
            user,
            token:token
        }
    } catch (error) {
        throw error;
    }
}
module.exports.otpMatch = async ({ otp }) => {
    let { error, value } = otpValidation.validate({ otp });
    if (error) {
        throw new Error(error.message);
    }
    try {
        let user = await customerSchema.findOne({ otp: otp });
        if (!user) {
            throw new Error('user doesn`t exist');
        }
        return {
            message: 'success',
            status: 200,
            user
        }
    } catch (error) {
        throw error;
    }
}

