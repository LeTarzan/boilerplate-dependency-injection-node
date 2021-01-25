const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir).bind(fs);

module.exports = (db) => new Promise((resolve, reject) => {
  try {
    readdir('./src/repositories')
      .then(files => files.filter(file => file.indexOf('repository') > 0))
      .then(repositories => {
        const modules = repositories.reduce((exportObject, repoFile) => {
          const Factory = require(`./${repoFile}`)

          if (Factory && typeof Factory === 'function') {
            const repository = new Factory(db.models)
            const exportName = `${repoFile.split('.')[0]}Repository`
            return { ...exportObject, [exportName]: repository }
          }

        }, {})
        return resolve(modules)
      })
      .catch(err => reject(err))
  } catch (error) {
    return reject(error)
  }
}) 