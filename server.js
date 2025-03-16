require("dotenv").config();
require("./config/database"); // connect mongoose
const express = require("express");
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require("path"); // path module


//Model
const Workout = require("./models/workout");

//starting the server
const app = express();
const PORT = process.env.PORT ? process.env.port : "3000";

//Middle ware
app.use(express.urlencoded({ extended: false })); // look at body and converts to JS object - looks at name property of your HTML fields
app.use(methodOverride('_method'))// replace post with delete
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public"))); // serve static files


// Routes
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//WORKOUT ROUTES / CREATE
// also need to handle the submission of the form
app.get("/workouts", async (req, res) => {
  const workouts = await Workout.find({});
  console.log(workouts);
  res.render("workouts/index.ejs", { workouts });
});

// Set up a route to show a form to ADD a new workout
app.get("/workouts/new", async (req, res) => {
  res.render("workouts/new.ejs");
});

app.post("/workouts", async (req, res) => {
  // pull info from requsst.body
  //model.create(body info)
  //send the user to some place (redirect to some other route )
  const exercises = [];
  for (let i = 0; req.body[`exercises[${i}][name]`]; i++) {
      exercises.push({
          name: req.body[`exercises[${i}][name]`],
          reps: req.body[`exercises[${i}][reps]`] || 0,
          sets: req.body[`exercises[${i}][sets]`] || 0,
          duration: req.body[`exercises[${i}][duration]`] || "",
          notes: req.body[`exercises[${i}][notes]`] || ""
      });
  }

  const workout = await Workout.create({
    name: req.body.name,
    difficulty: req.body.difficulty,
    category: req.body.category,
    duration: req.body.duration,
    exercises: exercises
});

  console.log("body: ", req.body)

  console.log("Parsed Exercises Array:", exercises);

  // res.send('created')
  res.redirect("/workouts/new"); //follow up network request
});

// WORKOUT ROUTES // SHOW ROUTE

app.get("/workouts/:id", async (req, res) => {
  try {
    //grab id from params
    const workoutId = req.params.id;
    // use ID to find record in data base
    const workout = await Workout.findById(workoutId);
    console.log('workout data', workout)
    console.log('Exercise:', workout.exercises)
    if (!workout) {
      return res.status(404).send("Workout not found");
    }
    res.render("workouts/show.ejs", { workout });
  } catch (err) {
    console.error(error);
    res.status(500).send('Server error');
  }

});


app.delete('/workouts/:id', async (req, res) => {
    const workoutId = req.params.id;
    await Workout.findByIdAndDelete(workoutId);

    res.redirect('/workouts')

})

// Set up a route to show a form to EDIT a new workout
app.get('/workouts/:id/edit', async (req, res) => {
    const workoutId = req.params.id;
    // use ID to find record in data base
    const workout = await Workout.findById(workoutId);
    console.log(workout.exercises)

    res.render('workouts/edit.ejs', {workout})
})



app.put('/workouts/:id', async (req, res) => {
  try {
      const workoutId = req.params.id;

      console.log("Raw Request Body:", req.body); // Debugging step
      
      const workout = await Workout.findByIdAndUpdate(workoutId);
      if (!workout) {
          return res.status(404).send("Workout not found");
      }

      const exercises = [];
      for (let i = 0; req.body[`exercises[${i}][name]`]; i++) {
        exercises.push({
            name: req.body[`exercises[${i}][name]`],
            reps: req.body[`exercises[${i}][reps]`] || 0,
            sets: req.body[`exercises[${i}][sets]`] || 0,
            duration: req.body[`exercises[${i}][duration]`] || "",
            notes: req.body[`exercises[${i}][notes]`] || ""
        });
    }

      console.log("Parsed Exercises Array:", exercises);

      // Find the existing workout

      workout.exercises = exercises;

      await workout.save();
      res.redirect('/workouts');

  } catch (error) {
      console.error(error);
      res.status(500).send("Error updating workout");
  }
});





//listener
app.listen(PORT, () => {
  console.log(`app started on ${PORT}`);
});
