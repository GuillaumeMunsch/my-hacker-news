import { asyncReducerHelper } from 'src/utils';

const initialState = {
  status: '',
  error: '',
  user: [],
  page: 1,
};

const actions = {
  ...asyncReducerHelper('USER', { stateName: 'user', behavior: 'item' }),
};

const itemReducer = (state = initialState, action = {}) => {
  if (actions?.[action.type]) return actions[action.type](state, action);
  switch (action.type) {
    default:
      return state;
  }
};

export default itemReducer;
