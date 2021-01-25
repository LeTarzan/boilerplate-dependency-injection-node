const { Router } = require('express')

class ProductsRouter {
  constructor(controller){
    this.productsController = controller
  }

  create() {
    return new Router()
      .get('/', this.productsController.listAll.bind(this.productsController))
  }
}

module.exports = ProductsRouter