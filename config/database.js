const mongoose = require('mongoose')


//connection
mongoose.connect(process.env.MONGODB_URI)


mongoose.connection.on('connected', () => {
    console.log(`Connected to Mongoose ${mongoose.connection.name} `)
})
