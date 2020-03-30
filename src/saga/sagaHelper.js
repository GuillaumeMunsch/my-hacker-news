import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { fetchHelper } from 'src/utils';
import getRoute from 'src/routes';

function* setListOptions(dataType, actionName, action = {}, verbose) {
  try {
    const state = yield select();
    const options = action.options || {};

    const { page } = state.listReducer;

    yield put({
      type: `SET_LIST_OPTIONS`,
      page: options.reset ? 1 : page + 1,
    });
  } catch (e) {
    console.log('Error', e);
  }
}

function* fetchList(dataType, actionName, routeName, action, verbose, initial = true) {
  try {
    if (verbose) console.log('raw action', action);

    yield put({ type: `FETCH_${actionName}_LIST_REQUEST` });

    const state = yield select();
    const { page } = state.listReducer;
    const additionalQueryParams = action.queryParams ? action.queryParams(state) : {};
    const routeParams = action.routeParams ? action.routeParams(state) : {};

    const fetchData = fetchHelper.prepareFetch(getRoute('GET', `fetch${routeName}`, routeParams), {
      headerParams: { /* token: state.authReducer.token, */ contentType: 'application/json' },
    });
    console.log('fetchData', fetchData);

    if (verbose) {
      console.log('routeName', `fetch${routeName}`);
      console.log('fetchData', fetchData);
    }

    const res = yield call(fetch, fetchData.url, fetchData.params);
    if (!res.ok) throw res;

    const response = yield res.json();

    if (verbose) {
      console.log('fetch response', response);
    }

    if (response.status === 'failure') throw response.data;
    console.log(`FETCH_${actionName}_LIST_SUCCESS`);
    yield put({
      type: `FETCH_${actionName}_LIST_SUCCESS`,
      //   reset: options.reset,
      data: response,
    });
    return true;
  } catch (e) {
    console.log('Error', e);
    if (action.options?.forwardErrors) throw e;
    yield put({ type: `FETCH_${actionName}_LIST_FAILURE`, error: e });
    return false;
  }
}

const helper = (dataType, sagaOptions) =>
  function* watchFetchList() {
    const actionName = sagaOptions?.prefix
      ? `${sagaOptions.prefix.toUpperCase()}_${dataType.toUpperCase()}`
      : dataType.toUpperCase();
    const routeName = sagaOptions?.prefix
      ? `${sagaOptions.prefix}${dataType.toUpperCase().charAt(0) + dataType.slice(1)}`
      : dataType.toUpperCase().charAt(0) + dataType.slice(1);

    if (sagaOptions.verbose) {
      console.log('Action name', actionName);
      console.log('Route name', routeName);
      console.log('request channel', `FETCH_${actionName}_LIST`);
    }

    const requestChan = yield actionChannel(`FETCH_${actionName}_LIST`);
    while (true) {
      const action = yield take(requestChan);
      if (action.reset)
        yield put({
          type: 'SET_LIST_OPTIONS',
          page: 1,
        });

      yield call(fetchList, dataType, actionName, routeName, action, sagaOptions.verbose);
    }
  };

export default helper;
