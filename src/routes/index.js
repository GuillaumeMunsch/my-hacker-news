import routes from './routes';

const getRoute = (method = '', name = '', params = {}) => {
  let route = routes?.[name]?.[method];
  Object.keys(params).forEach(key => {
    route = route.replace(`{:${key}}`, params[key]);
  });
  return { name: route, method };
};

export default getRoute;
