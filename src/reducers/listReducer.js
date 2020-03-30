import { asyncReducerHelper } from 'src/utils';

const initialState = {
  status: '',
  error: '',
  itemList: [],
  page: 1,
};

const actions = {
  ...asyncReducerHelper('LIST', { stateName: 'itemList', behavior: 'list' }),
};

const listReducer = (state = initialState, action = {}) => {
  if (actions?.[action.type]) return actions[action.type](state, action);
  switch (action.type) {
    case 'SET_LIST_OPTIONS':
      return {
        ...state,
        page: action.page,
        itemList: action.page !== 1 ? state.itemList : [],
      };
    default:
      return state;
  }
};

export default listReducer;
