import { createAction, createReducer } from '@reduxjs/toolkit';
import { USER_REQUEST, GET_USERS, USERS_SUCCESS, USERS_FAIL, USER_UPDATE_REQUEST } from './types';

// Actions
export const userActionRequest = createAction(USER_REQUEST);
export const userUpdateRequest = createAction(USER_UPDATE_REQUEST);
export const userActionGetUsers = createAction(GET_USERS);
export const userActionSuccess = createAction(USERS_SUCCESS);
export const usernActionFail = createAction(USERS_FAIL);

export const UserReducer = createReducer(null, {
  [userActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [usernActionFail]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
