import { createAction, createReducer } from '@reduxjs/toolkit';
import { AUTH_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

// Actions
export const loginActionRequest = createAction(AUTH_REQUEST);
export const loginActionSuccess = createAction(LOGIN_SUCCESS);
export const loginActionFail = createAction(LOGIN_FAIL);

export const loginReducer = createReducer(null, {
  [loginActionSuccess]: (state, action) => ({ ...state, data: action.payload, error: '' }),
  [loginActionFail]: (state, action) => ({ ...state, data: [], error: action.payload }),

});
