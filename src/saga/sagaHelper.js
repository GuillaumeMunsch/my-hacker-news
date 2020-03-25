import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { fetchHelper } from 'src/utils';
import getRoute from 'src/routes';

function* setListOptions(dataType, actionName, reducerName, action = {}, verbose) {
  try {
    const state = yield select();
    const options = action.options || {};

    if (verbose) {
      console.log('setListOptions reducer name', `state.userAppsReducer.${reducerName}ListReducer`);
      console.log('setListOptions action name', `SET_${actionName}_LIST_OPTIONS`);
    }

    const { offset, limit } = state[`${reducerName}ListReducer`];

    yield put({
      type: `SET_${actionName}_LIST_OPTIONS`,
      ...options,
      offset: options.reset ? 0 : offset + limit,
      filters: options.filters,
    });
  } catch (e) {
    console.log('Error', e);
  }
}

function* fetchList(dataType, actionName, reducerName, action, verbose, initial = true) {
  try {
    if (verbose) console.log('raw action', action);

    yield put({ type: `FETCH_${actionName}_LIST_REQUEST` });

    const state = yield select();
    const { page } = state[`${reducerName}Reducer`];
    const additionalQueryParams = action.queryParams ? action.queryParams(state) : {};
    const routeParams = action.routeParams ? action.routeParams(state) : {};

    const fetchData = fetchHelper.prepareFetch(
      getRoute(
        'GET',
        `fetch${reducerName.charAt(0).toUpperCase() + reducerName.slice(1)}List`,
        routeParams
      ),
      {
        headerParams: { /* token: state.authReducer.token, */ contentType: 'application/json' },
        queryParams: {
          // eslint-disable-next-line
          // off: offset,
          // lim: limit,
          // sort: selectedSortOption || action.sortOption || null,
          // ...fetchHelper.filtersHandler(action.options.filters),
          ...additionalQueryParams,
        },
      }
    );

    if (verbose) {
      console.log(
        'routeName',
        `fetch${reducerName.charAt(0).toUpperCase() + reducerName.slice(1)}List`
      );
      console.log('additionalQueryParams', additionalQueryParams);
      console.log('routeParams', routeParams);
      console.log('fetchData', fetchData);
    }

    const res = yield call(fetch, fetchData.url, fetchData.params);
    if (!res.ok) throw res;

    const response = yield res.json();

    if (verbose) {
      console.log('fetch response', response);
    }

    // if (action.options?.forwardErrors && response.status === 'failure') throw response.data;

    // const refreshResult = yield refreshTokenHelper(
    //     response,
    //     state,
    //     initial,
    //     function* f() {
    //         return yield fetchList(dataType, actionName, reducerName, action, false);
    //     },
    //     action.options?.forwardErrors
    // );
    // if (refreshResult === false) {
    //     return false;
    // }
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

const helper = (dataType, sagaOptions, verbose) =>
  function* watchFetchList() {
    const actionName = sagaOptions?.prefix
      ? `${sagaOptions.prefix.toUpperCase()}_${dataType.toUpperCase()}`
      : dataType.toUpperCase();
    const reducerName = sagaOptions?.prefix
      ? `${sagaOptions.prefix}${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`
      : dataType;

    if (verbose) {
      console.log('action name', actionName);
      console.log('reducer name', reducerName);
      console.log('request channel', `FETCH_${actionName}_LIST`);
    }

    const requestChan = yield actionChannel(`FETCH_${actionName}_LIST`);
    while (true) {
      const action = yield take(requestChan);
      yield call(fetchList, dataType, actionName, reducerName, action, verbose);
    }
  };

export default helper;
