import routes from './routes';

const getRoute = (method = '', name = '', params = {}) => {
    let route = routes?.[name]?.[method];

    console.log('route', route);
    console.log('method', method);
    console.log('name', name);
    console.log('params', params);

    Object.keys(params).forEach((key) => {
        route = route.replace(`{${key}}`, params[key]);
    });
    return { name: route, method };
};

export default getRoute;