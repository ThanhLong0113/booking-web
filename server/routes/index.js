const usersRouter = require('./users')

const route = (app) => {
    app.use('/users', usersRouter)
}

module.exports = route