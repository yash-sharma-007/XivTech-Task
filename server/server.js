const express = require('express')
const cors=require('cors')
const app = express()
app.use(express.urlencoded({ extended: true }));


require('dotenv').config({
    path:`${__dirname}/.env`
})

app.use(cors())
app.use(express.json())
app.use('/getweather',require('./routes/city'))




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on https://localhost:${process.env.PORT}`)
})
