import { all, fork } from 'redux-saga/effects';
import sagaHelper from './sagaHelper';

function* rootSaga() {
  yield all([fork(sagaHelper('news', {}))]);
}

export default rootSaga;
