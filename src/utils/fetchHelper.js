import * as config from 'src/config.json';
import getRoute from 'src/routes';

const fetchHelper = {
    filtersHandler: actionFilters => {
        let fetchFilters = { c: null };
        if (actionFilters) {
            // categories filters
            fetchFilters = {
                c: actionFilters
                    .filter(categoryFilter => categoryFilter.selected && categoryFilter.isCategory)
                    .map(categoryFilter => categoryFilter.id),
            };
            if (!fetchFilters.c.length) {
                fetchFilters = { c: null };
            }

            // other filters
            const queryFilters = {};
            actionFilters
                .filter(filter => !filter.isCategory && filter.selected)
                .forEach(filter => {
                    if (filter.isExclusive && queryFilters[filter.queryParam]) {
                        queryFilters[filter.queryParam] = null;
                    } else {
                        queryFilters[filter.queryParam] = queryFilters[filter.queryParam]
                            ? `${queryFilters[filter.queryParam]},${filter.getValue()}`
                            : filter.getValue();
                    }
                });

            fetchFilters = { ...fetchFilters, ...queryFilters };
        }

        return fetchFilters;
    },

    prepareFetchUrl: (route, queryParams = {}) => {
        const fetchUrl = `${config.API_URL}${route.name}`;
        console.log("fetchUrl", fetchUrl);

        let isFirstQueryParam = true;
        const entries = Object.entries(queryParams);

        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] !== null && entries[i][1] !== null) {
                fetchUrl += isFirstQueryParam ? `?${entries[i][0]}=` : `&${entries[i][0]}=`;
                isFirstQueryParam = false;
                const type = typeof entries[i][1];
                if (type === 'object') {
                    if (Array.isArray(entries[i][1])) {
                        fetchUrl += entries[i][1].join(',');
                    } else {
                        // if queryParam is an object ({}), may be useful later
                    }
                } else if (type !== 'object') {
                    fetchUrl += entries[i][1];
                }
            }
        }

        // console.log('fetchUrl', fetchUrl);
        return fetchUrl;
    },

    prepareFetchHeaders: (headerParams = {}) => {
        let headers = {};
        if (headerParams.noAppVersion) {
            headers = {};
        }
        if (headerParams.token) {
            headers = { ...headers, Authorization: `Bearer ${headerParams.token}` };
        }
        if (headerParams.contentType) {
            headers = { ...headers, 'Content-Type': headerParams.contentType };
        }
        if (headerParams.sharepointSiteHome) {
            headers = { ...headers, 'Sharepoint-Site-Home': headerParams.sharepointSiteHome };
        }
        return headers;
    },

    prepareFetch: (route, params = {}) => {
        console.log("prepareFetch", route, params);

        const url = fetchHelper.prepareFetchUrl(route, params.queryParams);
        console.log("Url", url);
        const headers = fetchHelper.prepareFetchHeaders(params.headerParams);
        console.log("headers", headers);

        const preparedFetch = { url, params: { method: route.method, headers } };
        console.log("preparedFetch", preparedFetch);

        if (params.body) {
            preparedFetch.params.body = params.body;
        }
        if (params.verbose) console.log('preparedFetch', preparedFetch);
        return preparedFetch;
    },
};

export default fetchHelper;