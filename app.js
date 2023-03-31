const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const dbConnect = require("./config/DBConnect");
const userSchema = require("./Schemas/userSchema");
const userController = require("./controller/user.controller");
const app = express();
const swaggerUI = require('swagger-ui-express');
const port = process.env.Port || 4000;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    // #swagger.summary = "Hello World!!"
    res.send("Helo from the other side")
});
app.post("/admin", async (req, res) => {
    // #swagger.summary = "Admin User"
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Some description...',
        schema: {
            name:'',
            email:"", 
            password:"", 
            role:""
        }
} */
    try {
        let response = await userController.admin(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
})

app.post("/business", async (req, res) => {

    // #swagger.summary = "Business Owner"
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Some description...',
        schema: {
            businessName:'',
            ownerName:"", 
            address:"",
            email:"",
            phoneNumber:"",
            industry:"",
            website:"",
            businessDescription:""

        }
} */
    try {
        let response = await userController.business(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
})

app.post("/customer", async (req, res) => {
    // #swagger.summary = "Customer Login"
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Some description...',
        schema: {
            name:'',
            email:"", 
        }
} */
    try {
        let response = await userController.customer(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
})
app.post("/otpMatch", async (req, res) => {
    // #swagger.summary = "OTPMatch"
    /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Some description...',
        schema: {
            otp:'',
        }
} */
    try {
        let response = await userController.otpMatch(req.body);
        return res.status(response.status).send(response);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
})

const swaggerJson = require('./swagger.json')
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})