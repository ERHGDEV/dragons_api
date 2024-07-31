const dragonsRouter = require('express').Router()
const Dragon = require('../models/dragon')

dragonsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

dragonsRouter.get('/api/dragons', (request, response) => {
    Dragon.find({}).then(dragons => {
        response.json(dragons)
    })
})

dragonsRouter.get('/api/dragons/:id', (request, response, next) => {
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

dragonsRouter.post('/api/dragons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.riders || !body.colors || !body.notes || !body.hatched || !body.died || !body.books || !body.tv_series || !body.image) {
        return response.status(400).json({
            error: 'missing content'
        })
    }

    const dragon = new Dragon({
        name: body.name,
        called: body.called,
        riders: body.riders,
        colors: body.colors,
        notes: body.notes,
        hatched: body.hatched,
        died: body.died,
        books: body.books,
        tv_series: body.tv_series,
        image: body.image
    })

    dragon.save()
        .then(savedDragon => {
            response.json(savedDragon)
        })
        .catch(error => next(error))
})

dragonsRouter.put('/api/dragons/:id', (request, response, next) => {
    const body = request.body

    const dragon = {
        name: body.name,
        called: body.called,
        riders: body.riders,
        colors: body.colors,
        notes: body.notes,
        hatched: body.hatched,
        died: body.died,
        books: body.books,
        tv_series: body.tv_series,
        image: body.image
    }

    Dragon.findByIdAndUpdate(request.params.id, dragon, { new: true })
        .then(updatedDragon => {
            response.json(updatedDragon)
        })
        .catch(error => next(error))
})

dragonsRouter.delete('/api/dragons/:id', (request, response, next) => {
    Dragon.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = dragonsRouter