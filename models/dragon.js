const mongoose = require('mongoose')

const dragonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    called: {
        type: String,
        required: false
    },
    riders: {
        type: String,
        required: true
    },
    colors: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    hatched: {
        type: String,
        required: true
    },
    died: {
        type: String,
        required: true
    },
    books: {
        type: String,
        required: true
    },
    tv_series: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

//convertir id en String
dragonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})  

module.exports = mongoose.model('Dragon', dragonSchema)