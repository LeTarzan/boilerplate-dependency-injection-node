const path = require('path');

const db = {
  models: {
    'Products': require(`${path.join('../', 'models', 'products')}`)
  },
};

module.exports = db;
