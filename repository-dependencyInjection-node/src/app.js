const express = require('express');

const database = require('./database');
const middleware = require('./middlewares')

const buildContainer = require('./config/container');

const serviceFactory = require('./services');
const controllerFactory = require('./controllers');
const repositoryFactory = require('./repositories');
const routerFactory = require('./routers');
const getRouters = require('./routers/routes')

class App {
  constructor(config){
    this.server = express()

    this._loadContainer(config)
    .then(() => {
      if(!this.routers){
        throw new Error('Error on load routes')
      }

      this._injectMiddlewares(config.middleware);
      this._useRouter(getRouters(this.routers))
    })
    .catch(console.error);
  }

  async _loadContainer({ db }) {
    this.routers = await buildContainer({
      db,
      serviceFactory, 
      controllerFactory,
      repositoryFactory,
      routerFactory,
    });
  }

  _injectMiddlewares(middlewareInjector) {
    if (typeof middlewareInjector === 'function') {
      this.server = middlewareInjector(this.server);
    }
  }

  _useRouter(routerConfig) {
    this.server.use(routerConfig)
  }

  create() {
    return this.server;
  }
}

module.exports = new App({
  db: database,
  middleware
}).create();