import { all, fork } from 'redux-saga/effects';
import sagaHelper from './sagaHelper';

function* rootSaga() {
  yield all([fork(sagaHelper('ask', { verbose: true }))]);
  yield all([fork(sagaHelper('jobs', { verbose: true }))]);
  yield all([fork(sagaHelper('news', { verbose: false }))]);
  yield all([fork(sagaHelper('newest', { verbose: true }))]);
  yield all([fork(sagaHelper('show', { verbose: true }))]);
}

export default rootSaga;
