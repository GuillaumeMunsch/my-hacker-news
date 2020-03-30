import { asyncReducerHelper } from 'src/utils';

const initialState = {
  status: '',
  error: '',
  item: {},
};

const actions = {
  ...asyncReducerHelper('ITEM', { stateName: 'item', behavior: 'item' }),
};

const itemReducer = (state = initialState, action = {}) => {
  if (actions?.[action.type]) return actions[action.type](state, action);
  switch (action.type) {
    default:
      return state;
  }
};

export default itemReducer;
