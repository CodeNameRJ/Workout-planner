require('dotenv').config()
require('./config/database') // connect mongoose
const express = require('express')


//Model
const Workout = require('./models/workout')

//starting the server
const app = express()
const PORT = process.env.PORT ? process.env.port : '3000';


//Middle ware
app.use(express.urlencoded({ extended: false })); // look at body and converts to JS object - looks at name property of your HTML fields

// Routes
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

//WORKOUT ROUTES
// Set up a route to show a form to ADD a new workout
// also need to handle the submission of the form
// Set up a route to show a form to EDIT a new workout
app.get('/workouts', async (req, res) => {
    const workouts = await Workout.find({})
    console.log(workouts)
    res.render('workouts/index.ejs', {workouts})

})

app.get('/workouts/new', async (req, res) => {
    res.render('workouts/new.ejs')

})

app.post('/workouts', async (req, res) => {
    // pull info from requsst.body
    //model.create(body info)
    //send the user to some place (redirect to some other route )
    // console.log(req.body)
    await Workout.create(req.body)
    // res.send('created')
    res.redirect('/workouts/new') //follow up network request

})








//listener
app.listen(PORT, () => {
    console.log(`app started on ${PORT}`)
})
