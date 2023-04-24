const usersRouter = require('./user')

const route = (app) => {
    app.use('/users', usersRouter)
}

module.exports = route