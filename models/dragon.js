const mongoose = require('mongoose')

const dragonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    riders: {
        type: String,
        required: true
    },  
    Notes: {
        type: String,
        required: true
    },
    died: {
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