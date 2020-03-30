import { asyncReducerHelper } from 'src/utils';

const initialState = {
  status: '',
  error: '',
  elemList: [],
  page: 1,
};

const actions = {
  ...asyncReducerHelper('ASK_LIST', { stateName: 'elemList', behavior: 'list' }),
  ...asyncReducerHelper('JOBS_LIST', { stateName: 'elemList', behavior: 'list' }),
  ...asyncReducerHelper('NEWEST_LIST', { stateName: 'elemList', behavior: 'list' }),
  ...asyncReducerHelper('NEWS_LIST', { stateName: 'elemList', behavior: 'list' }),
  ...asyncReducerHelper('SHOW_LIST', { stateName: 'elemList', behavior: 'list' }),
};

const listReducer = (state = initialState, action = {}) => {
  if (actions?.[action.type]) return actions[action.type](state, action);
  switch (action.type) {
    default:
      return state;
  }
};

export default listReducer;
