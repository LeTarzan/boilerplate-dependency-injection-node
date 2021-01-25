const { Router } = require('express')

module.exports = (routes) => new Router()
  .use('/products', routes.productsRouter)
  .use('*', (req, res) => res.status(404).send('Not found'))