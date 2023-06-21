const usersRouter = require('./users')
const destinationsRouter = require('./destinations')
const hotelsRouter = require('./hotels')
const roomsRouter = require('./rooms')

const route = (app) => {
    app.use('/users', usersRouter)
    app.use('/destinations', destinationsRouter)
    app.use('/hotels', hotelsRouter)
    app.use('/rooms', roomsRouter)
}

module.exports = route