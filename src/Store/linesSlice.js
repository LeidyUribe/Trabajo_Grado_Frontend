import { createAction, createReducer } from '@reduxjs/toolkit';
import { LINES_REQUEST, LINES_UPDATE_REQUEST,LINES_DELETE_REQUEST, GET_LINES, LINES_SUCCESS, LINES_FAIL } from './types';

// Actions
export const linesActionRequest = createAction(LINES_REQUEST);
export const linesUpdateRequest = createAction(LINES_UPDATE_REQUEST);
export const linesDeleteRequest = createAction(LINES_DELETE_REQUEST);
export const linesActionGetLines = createAction(GET_LINES);
export const linesActionSuccess = createAction(LINES_SUCCESS);
export const linesActionFail = createAction(LINES_FAIL);

export const linesReducer = createReducer(null, {
  [linesActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [linesActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
