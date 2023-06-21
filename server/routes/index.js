const customersRouter = require('./customer')

const route = (app) => {
    app.use('/customers', customersRouter)
}

module.exports = route