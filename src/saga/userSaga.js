import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { fetchHelper } from 'src/utils';
import getRoute from 'src/routes';

function* fetchUser(action, options) {
  try {
    if (options.verbose) console.log('Action', action);
    yield put({ type: `FETCH_USER_REQUEST` });
    const state = yield select();
    const fetchData = fetchHelper.prepareFetch(
      getRoute('GET', `fetchUser`, { name: action.userName }),
      { headerParams: { contentType: 'application/json' } }
    );
    if (options.verbose) console.log('fetchData', fetchData);
    const res = yield call(fetch, fetchData.url, fetchData.params);
    if (!res.ok) throw res;
    const response = yield res.json();

    if (options.verbose) console.log('fetch response', response);

    if (response.status === 'failure') throw response.data;
    console.log(`FETCH_USER_SUCCESS`);
    return yield put({ type: `FETCH_USER_SUCCESS`, data: response });
  } catch (e) {
    console.log('Error', e);
    return yield put({ type: `FETCH_USER_FAILURE`, error: e });
  }
}

function* watchFetchUser() {
  const requestChan = yield actionChannel(`FETCH_USER`);
  while (true) {
    const action = yield take(requestChan);
    yield call(fetchUser, action, { verbose: true });
  }
}

export default watchFetchUser;
