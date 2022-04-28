import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { Reducer } from 'redux';

import auth from './auth/slice';
import appOptions from './appOptions/slice';

const createRootReducer = (history: any): Reducer => {
  return combineReducers({
    router: connectRouter(history),
    appOptions,
    auth,
  });
};

export default createRootReducer;
