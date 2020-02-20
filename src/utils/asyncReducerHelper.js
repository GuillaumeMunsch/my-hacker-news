/*
 ** Opts
 ** stateName: State value's name. Default -> 'data'
 ** actionDataName: Action value's name. Default -> 'data'
 ** actionTypeName: Action type's name. Default -> 'FETCH'
 ** condition: Optional function called to check if the action has to be handled. Default -> undefined
 ** behavior: Default -> 'item'
 ** verbose: Default -> false
 */

const dataFormater = (behavior, state, action, actionDataName, stateName) => {
    switch (behavior) {
        case 'item':
            return { [stateName]: action?.[actionDataName] };
        case 'list': {
            const resources = action.clear
                ? action?.[actionDataName]
                : state?.[stateName].concat(action?.[actionDataName]);
            return {
                [stateName]: resources,
                error: {},
                offset: resources.length,
                full: action.total <= resources.length,
                total: action.total,
                filters: action.categoriesList
                    ? [
                        ...state.filters,
                        ...action.categoriesList
                            .map(category => ({
                                label: { default: category.value },
                                id: category.id,
                                selected: false,
                                isCategory: true,
                            }))
                            // eslint-disable-next-line max-len
                            .filter(
                                category => state.filters.findIndex(filter => filter.id === category.id) === -1
                            ),
                    ]
                    : state.filters,
            };
        }
        default:
            return {};
    }
};

const asyncReducerHelper = (type = null, options = {}) => {
    const actionDataName = options.actionDataName || 'data';
    const actionTypeName = options.actionTypeName !== undefined ? options.actionTypeName : 'FETCH';
    const behavior = options.behavior || 'item';
    const stateName = options.stateName || 'data';
    return {
        // REQUEST
        [`${actionTypeName ? `${actionTypeName}_` : ''}${type}_REQUEST`]: (state, action) => {
            if (!options.condition || options.condition(state, action))
                return {
                    ...state,
                    status: 'requesting',
                    filters: action.filters || state.filters,
                };
            return state;
        },

        // SUCCESS
        [`${actionTypeName ? `${actionTypeName}_` : ''}${type}_SUCCESS`]: (state, action) => {
            if (!options.condition || options.condition(state, action)) {
                const successValue = {
                    ...state,
                    ...dataFormater(behavior, state, action, actionDataName, stateName),
                    status: 'success',
                };
                if (options?.verbose) {
                    console.log('Success Action', action);
                    console.log('Success Value', successValue);
                }
                return successValue;
            }
            return state;
        },

        // FAILURE
        [`${actionTypeName ? `${actionTypeName}_` : ''}${type}_FAILURE`]: (state, action) => {
            if (!options.condition || options.condition(state, action)) {
                if (options?.verbose) console.log('Error Action', action);
                return {
                    ...state,
                    status: 'error',
                    error: action.error,
                };
            }
            return state;
        },
    };
};

export default asyncReducerHelper;