require('dotenv').config()
require('./config/database')

const express = require('express')

//starting the server
const app = express()
const PORT = process.env.PORT ? process.env.port : '3000';


//Model
const Workout = require('./models/workout')


// Routes

app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.get('/workouts/new', async (req, res) => {
    res.render('workouts/new.ejs')

})





//listener
app.listen(PORT, () => {
    console.log(`app started on ${PORT}`)
})
