class ProductServices {
  constructor({ productsRepository }){
    this.productsRepository = productsRepository
  }

  listAll() {
    return this.productsRepository.listAll()
  }
}

module.exports = ProductServices