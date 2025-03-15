//
const mongoose = require('mongoose')

// SCHEMA
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: Number,
    sets: Number,
    duration: String,
    notes: String,
});

const workoutSchema = new mongoose.Schema({
    name: {type: String, required: true},
    exercises: [exerciseSchema],
    duration: String,
    difficulty: {
        type: String,
        validate: {
            validator: (value) => ['Easy', 'Medium', 'Hard'].includes(value),
            message: props => `${props.value} is not a valid difficulty level!`
        },
        default: 'Medium'
    },
    category: { type: String, required: true }, // "Strength"
    createdAt: { type: Date, default: Date.now },
});


// register the schema
const Workout = mongoose.model('Workout', workoutSchema)


//share with applicaiton
module.exports = Workout
