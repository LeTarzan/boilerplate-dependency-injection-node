module.exports = async ({
  db,
  serviceFactory,
  controllerFactory,
  repositoryFactory,
  routerFactory
}) => {
  await serviceFactory.start(db, repositoryFactory);
  const services = await serviceFactory.getAllServices();
  const controllers = await controllerFactory(services);
  return routerFactory(controllers)
};
