const usersRouter = require('./users')
const destinationsRouter = require('./destinations')
const hotelsRouter = require('./hotels')
const roomsRouter = require('./rooms')
const cartsRouter = require('./carts')

const route = (app) => {
    app.use('/users', usersRouter)
    app.use('/destinations', destinationsRouter)
    app.use('/hotels', hotelsRouter)
    app.use('/rooms', roomsRouter)
    app.use('/carts', cartsRouter)
}

module.exports = route