const mongoose = require('mongoose')


//connection
mongoose.connect(process.env.MONGODB_URI)

// event listener 
mongoose.connection.on('connected', () => {
    console.log(`Connected to Mongoose ${mongoose.connection.name} `)
})
