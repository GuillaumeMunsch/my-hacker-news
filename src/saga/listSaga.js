import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { fetchHelper } from 'src/utils';
import getRoute from 'src/routes';

function* setListOptions(action, options) {
  try {
    const state = yield select();
    const { page } = state.listReducer;
    yield put({
      type: `SET_LIST_OPTIONS`,
      page: action.reset ? 1 : page + 1,
    });
  } catch (e) {
    console.log('Error', e);
  }
}

function* fetchList(action, options) {
  try {
    if (options.verbose) console.log('Action', action);
    if (action.reset)
      yield put({
        type: 'SET_LIST_OPTIONS',
        page: 1,
      });
    yield put({ type: `FETCH_LIST_REQUEST` });
    const state = yield select();
    const { page } = state.listReducer;
    const fetchData = fetchHelper.prepareFetch(
      getRoute(
        'GET',
        `fetch${action.listType.toUpperCase().charAt(0) + action.listType.slice(1)}`,
        {
          page,
        }
      ),
      {
        headerParams: { contentType: 'application/json' },
      }
    );
    if (options.verbose) console.log('fetchData', fetchData);
    const res = yield call(fetch, fetchData.url, fetchData.params);
    if (!res.ok) throw res;
    const response = yield res.json();

    if (options.verbose) console.log('fetch response', response);

    if (response.status === 'failure') throw response.data;
    console.log(`FETCH_LIST_SUCCESS`);
    yield setListOptions(action, options);
    return yield put({ type: `FETCH_LIST_SUCCESS`, data: response });
  } catch (e) {
    console.log('Error', e);
    return yield put({ type: `FETCH_LIST_FAILURE`, error: e });
  }
}

function* watchFetchList(options = {}) {
  const requestChan = yield actionChannel(`FETCH_LIST`);
  while (true) {
    const action = yield take(requestChan);
    yield call(fetchList, action, options);
  }
}

export default watchFetchList;
