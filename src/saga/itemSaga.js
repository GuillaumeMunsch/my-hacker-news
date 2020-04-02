import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { fetchHelper } from 'src/utils';
import getRoute from 'src/routes';

function* fetchItem(action, options) {
  try {
    if (options.verbose) console.log('Action', action);
    yield put({ type: `FETCH_ITEM_REQUEST` });
    const state = yield select();
    const fetchData = fetchHelper.prepareFetch(
      getRoute('GET', `fetchItem`, { id: action.itemID }),
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
    console.log(`FETCH_ITEM_SUCCESS`);
    return yield put({ type: `FETCH_ITEM_SUCCESS`, data: response });
  } catch (e) {
    console.log('Error', e);
    return yield put({ type: `FETCH_ITEM_FAILURE`, error: e });
  }
}

function* watchFetchItem() {
  const requestChan = yield actionChannel(`FETCH_ITEM`);
  while (true) {
    const action = yield take(requestChan);
    yield call(fetchItem, action, { verbose: false });
  }
}

export default watchFetchItem;
