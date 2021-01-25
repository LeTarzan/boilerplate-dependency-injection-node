const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir).bind(fs);

module.exports = (services) => new Promise((resolve, reject) => {
  try {
    readdir('./src/controllers')
      .then(files => files.filter(file => file.indexOf('controller') > 0))
      .then(controllers => {
        const modules = controllers.reduce((exportObject, controlFile) => {
          const Controller  = require(`./${controlFile}`)

          if (Controller  && typeof Controller  === 'function') {
            const controller = new Controller(services)
            const exportName = `${controlFile.split('.')[0]}Controller`
            return { ...exportObject, [exportName]: controller }
          }

        }, {})
        return resolve(modules)
      })
      .catch(err => reject(err))
  } catch (error) {
    return reject(error)
  }
}) 