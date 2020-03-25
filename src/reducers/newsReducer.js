import { asyncReducerHelper } from 'src/utils';

const initialState = {
  status: '',
  error: '',
  newsList: [],
  page: 1,
};

const actions = {
  ...asyncReducerHelper('NEWS_LIST', { stateName: 'newsList', behavior: 'list' }),
};

const newsReducer = (state = initialState, action = {}) => {
  if (actions?.[action.type]) return actions[action.type](state, action);
  switch (action.type) {
    default:
      return state;
  }
};

export default newsReducer;
