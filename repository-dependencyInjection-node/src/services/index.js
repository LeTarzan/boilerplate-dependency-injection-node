const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir).bind(fs);

class ServiceFactory {
  static async start(db, createRepository) {
    return new Promise(async (resolve, reject) => {
      try {
        const repositories = await createRepository(db)
        
        readdir('./src/services')
          .then(files => files.filter(file => file.indexOf('service') > 0))
          .then(services => {
            const modules = services.reduce((exportObject, servFile) => {
              const Service = require(`./${servFile}`)
    
              if (Service && typeof Service === 'function') {
                const service = new Service(repositories)
                const exportName = `${servFile.split('.')[0]}Service`
                return { ...exportObject, [exportName]: service }
              }
    
            }, {})

            this.services = modules

            return resolve(modules)
          })
          .catch(err => reject(err))
      } catch (error) {
        return reject(error)
      }
    })
  } 

  static getAllServices() {
    return this.services
  }

}

module.exports = ServiceFactory 