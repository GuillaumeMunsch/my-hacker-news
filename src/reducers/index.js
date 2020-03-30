import { combineReducers } from 'redux';
import listReducer from './listReducer';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

const reducers = combineReducers({ listReducer, itemReducer, userReducer });

export default reducers;
