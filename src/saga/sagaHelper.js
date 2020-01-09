import { actionChannel, call, take, put, select } from 'redux-saga/effects';
import { RightChecker } from 'components';
import { format, fetchHelper, refreshTokenHelper, sanitize } from 'MyHackerNews/src/utils';
import getRoute from 'routes';

function* fetchCategories(dataType, verbose) {
    try {
        const state = yield select();
        const fetchData = fetchHelper.categoriesHelper(state, dataType);
        if (verbose) {
            console.log('fetchCategories fetchData', fetchData);
        }

        const res = yield call(fetch, fetchData.url, fetchData.params);
        const response = yield res.json();
        if (verbose) {
            console.log('fetchCategories response', response);
        }
        if (response.status !== 'success') return null;
        return response.data;
    } catch (e) {
        console.log('Error', e);
        return null;
    }
}

function* setListOptions(dataType, actionName, reducerName, moduleName, action = {}, verbose) {
    try {
        const state = yield select();
        const options = action.options || {};

        if (verbose) {
            console.log(
                'setListOptions reducer name',
                `state.userAppsReducer.${moduleName}.${reducerName}ListReducer`
            );
            console.log('setListOptions action name', `SET_${actionName}_LIST_OPTIONS`);
        }

        const { offset, limit } = state.userAppsReducer[moduleName][`${reducerName}ListReducer`];

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

function* fetchList(
    dataType,
    actionName,
    reducerName,
    moduleName,
    action,
    verbose,
    initial = true
) {
    try {
        if (verbose) {
            console.log('raw action', action);
        }
        yield put({ type: `FETCH_${actionName}_LIST_REQUEST`, filters: action.options.filters });

        let fetchedCategories;
        if (action.options?.categories) {
            fetchedCategories = yield call(fetchCategories, dataType, verbose);
        }
        if (action.options?.reset) {
            yield call(setListOptions, dataType, actionName, reducerName, moduleName, action, verbose);
        }

        const state = yield select();
        const { selectedSquare, squares } = state.groupsModuleReducer.myGroupsReducer;
        const { offset, limit, selectedSortOption } = state.userAppsReducer[moduleName][
            `${reducerName}ListReducer`
        ];
        const additionalQueryParams = action.queryParams ? action.queryParams(state) : {};
        const routeParams = action.routeParams ? action.routeParams(state) : {};

        const fetchData = fetchHelper.prepareFetch(
            getRoute(
                'api',
                'GET',
                `fetch${reducerName.charAt(0).toUpperCase() + reducerName.slice(1)}List`,
                routeParams
            ),
            {
                headerParams: { token: state.authReducer.token, contentType: 'application/json' },
                queryParams: {
                    // eslint-disable-next-line
                    sid: action.squareBased
                        ? selectedSquare === 'all'
                            ? format.squareIds(squares)
                            : selectedSquare
                        : null, // null skips this query parameter
                    off: offset,
                    lim: limit,
                    sort: selectedSortOption || action.sortOption || null,
                    d: false,
                    ...fetchHelper.filtersHandler(action.options.filters),
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
            console.log('fetchList fetchData', fetchData);
        }

        const res = yield call(fetch, fetchData.url, fetchData.params);
        const response = yield res.json();

        if (verbose) {
            console.log('fetchList response', response);
        }

        if (action.options?.forwardErrors && response.status === 'failure') throw response.data;

        const refreshResult = yield refreshTokenHelper(
            response,
            state,
            initial,
            function* f() {
                return yield fetchList(dataType, actionName, reducerName, moduleName, action, false);
            },
            action.options?.forwardErrors
        );
        if (refreshResult === false) {
            return false;
        }
        if (response.status === 'failure') throw response.data;
        const rightsToCheck = [`${format.typeForDeleteRights(dataType)}_delete`];
        const data = response.data.results.map(item => {
            const groupsAllowed = RightChecker.checkRights(state.rightsReducer.rights, {
                rights: rightsToCheck,
                profile: state.authReducer.profile,
                ID: item.id,
                availableGroups: item?.entity?.present_in,
            });
            return {
                ...sanitize.item(dataType, item),
                disableLeftSwipe: groupsAllowed.length === 0,
                closeOnRowPress: true,
            };
        });
        yield put({
            type: `FETCH_${actionName}_LIST_SUCCESS`,
            data,
            clear: offset === 0,
            total: response.data.total,
            categoriesList: fetchedCategories,
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
        const moduleName = sagaOptions?.moduleName || `${dataType}ModuleReducer`;

        if (verbose) {
            console.log('action name', actionName);
            console.log('reducer name', reducerName);
            console.log('request channel', `FETCH_${actionName}_LIST`);
        }

        const requestChan = yield actionChannel(`FETCH_${actionName}_LIST`);
        while (true) {
            const action = yield take(requestChan);
            yield call(fetchList, dataType, actionName, reducerName, moduleName, action, verbose);
        }
    };

export default helper;