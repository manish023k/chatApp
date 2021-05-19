const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = 8000
const url = 'mongodb://127.0.0.1:27017/chatapplication';

//set application to accept the form data
// app.use(express.urlencoded({extended:false}))
app.use(express.json())

//connection with the mongodb server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("connecting succesfully...")
}).catch((err) => console.log(err))



const routerInit = require('./app/router/web')
routerInit(app)



app.listen(port, () => {
    console.log(`app running on the port: ${port}`)
})