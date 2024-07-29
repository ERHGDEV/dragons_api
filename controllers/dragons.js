const dragonsRouter = require('express').Router()
const Dragon = require('../models/dragon')

dragonsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

dragonsRouter.get('/dragons', (request, response) => {
    Dragon.find({}).then(dragons => {
        response.json(dragons)
    })
})

dragonsRouter.get('/dragons/:id', (request, response, next) => {
    Dragon.findById(request.params.id)
        .then(dragon => {
            if (dragon) {
                response.json(dragon)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

dragonsRouter.post('/dragons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.riders || !body.notes || !body.died) {
        return response.status(400).json({
            error: 'missing content'
        })
    }

    const dragon = new Dragon({
        name: body.name,
        riders: body.riders,
        notes: body.notes,
        died: body.died
    })

    dragon.save()
        .then(savedDragon => {
            response.json(savedDragon)
        })
        .catch(error => next(error))
})

dragonsRouter.put('/dragons/:id', (request, response, next) => {
    const body = request.body

    const dragon = {
        name: body.name,
        riders: body.riders,
        notes: body.notes,
        died: body.died
    }

    Dragon.findByIdAndUpdate(request.params.id, dragon, { new: true })
        .then(updatedDragon => {
            response.json(updatedDragon)
        })
        .catch(error => next(error))
})

dragonsRouter.delete('/dragons/:id', (request, response, next) => {
    Dragon.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = dragonsRouter