class Product {
  constructor(product) {
    this.product = product
  }

  isValid() {
    return this.product ? true : false
  }
}

module.exports = Product