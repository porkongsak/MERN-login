const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { readdirSync} = require('fs')
require('dotenv').config()
const  PORT = 5000 || process.env.PORT_SERVER
const connectDB = require('./config/db')

const app = express()

// ConnectDB
connectDB()

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())



// Route
// http://localhost:5000/api/
// #1
//app.use('/api', require('./routes/api'))

 //  #2
readdirSync('./routes').map((r)=> app.use('/api', require('./routes/'+r)))


app.listen(PORT,() =>{
    console.log('Server is running port '+ PORT)
})


// module.exports จะไม่ใช้ object