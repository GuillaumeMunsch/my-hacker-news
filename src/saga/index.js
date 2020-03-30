import { all, fork } from 'redux-saga/effects';
import listSaga from './listSaga';

function* rootSaga() {
  yield all([fork(listSaga({ verbose: true }))]);
}

export default rootSaga;
