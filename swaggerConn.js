const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const swaggerOptions ={
    swaggerDefinition: {
        openapi : '3.0.0',
        info : {
            title: 'Node JS API Project for MongoDB',
            version: '1.0.0',
        },
        servers: [
            {
            url: 'http://localhost:4000/'
            }
        ]
    },
    apis:['./app.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



app.get('/',(req,res)=>{
    res.send('Welcome to MongoDB API');
    console.log('Welcome to MongoDB API');
})



app.get('/api/books', (req,res)=>{
    console.log('Hello')
})
app.get('/api/student',(req,res)=>{
    console.log('This is student route')
})




app.post('/api/books', (req,res)=>{
    console.log('Post');
})



app.listen(port, ()=>{
    console.log(`Server is Listening on port no ${port}`)
})
