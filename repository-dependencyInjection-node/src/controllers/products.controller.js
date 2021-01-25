class ProductsController {
  constructor({ productsService }){
    this.productsService = productsService
  }

  async listAll(req, res, next) {
    try {
      return res.json(await this.productsService.listAll())
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = ProductsController