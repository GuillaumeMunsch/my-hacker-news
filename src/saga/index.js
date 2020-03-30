import { all, fork } from 'redux-saga/effects';
import listSaga from './listSaga';
import itemSaga from './itemSaga';
import userSaga from './userSaga';

function* rootSaga() {
  yield all([fork(listSaga), fork(itemSaga), fork(userSaga)]);
}

export default rootSaga;
