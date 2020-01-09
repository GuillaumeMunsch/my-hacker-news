import { all, fork } from 'redux-saga/effects';
import { sagaHelper } from './sagaHelper';
import watchFetchNews from './watchFetchNews';

function* rootSaga() {
    yield all([
        fork(watchFetchNews),
    ]);
}

export default rootSaga;