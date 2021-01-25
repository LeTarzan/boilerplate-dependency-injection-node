const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir).bind(fs);

module.exports = (controllers) => new Promise((resolve, reject) => {
  try {
    readdir('./src/controllers')
      .then(files => files.filter(file => file.indexOf('controller') > 0))
      .then(files => {
        const modules = files.reduce((exportObject, routeFile) => {
          const RouterHandler = require(`./${routeFile.split('.')[0]}.router`)

          if (RouterHandler && typeof RouterHandler === 'function') {
            const router = new RouterHandler(controllers[`${routeFile.split('.')[0]}Controller`]).create()
            const exportName = `${routeFile.split('.')[0]}Router`
            return { ...exportObject, [exportName]: router }
          }

        }, {})
        return resolve(modules)
      })
      .catch(err => reject(err))
  } catch (error) {
    return reject(error)
  }
}) 