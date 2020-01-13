import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import reducers from './src/reducers'
import rootSaga from './src/saga'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];

const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(...middlewares))
)
if (module.hot) {
    module.hot.accept('./src/reducers', () => {
        const nextReducers = require('./src/reducers');
        store.replaceReducer(nextReducers);
    });
}
sagaMiddleware.run(rootSaga)

export default store