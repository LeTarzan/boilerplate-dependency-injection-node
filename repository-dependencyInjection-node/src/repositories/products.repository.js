const Product = require("../models/products")

class ProductsRepository extends Product {
  constructor({ products }){
    super()
    this.products = products
  }

  listAll() {
    // this.products.query(...)
  
    return [
      {
        name: 'This is a product'
      }
    ]
    
  }
}

module.exports = ProductsRepository