import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './src/reducers'
import sagaMiddleware from './src/saga'

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, thunk)
)

sagaMiddleware.run(sagaMiddleware)

export default store