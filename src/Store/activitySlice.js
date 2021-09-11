import { createAction, createReducer } from '@reduxjs/toolkit';
import { ACTIVITY_REQUEST, ACTIVITY_UPDATE_REQUEST, ACTIVITY_DELETE_REQUEST, GET_ACTIVITIES, ACTIVITY_SUCCESS, ACTIVITY_FAIL } from './types';

// Actions
export const activityActionRequest = createAction(ACTIVITY_REQUEST);
export const activityUpdateRequest = createAction(ACTIVITY_UPDATE_REQUEST);
export const activityDeleteRequest = createAction(ACTIVITY_DELETE_REQUEST);
export const activityActionGetAtivities = createAction(GET_ACTIVITIES);
export const activityActionSuccess = createAction(ACTIVITY_SUCCESS);
export const activityActionFail = createAction(ACTIVITY_FAIL);

export const activityReducer = createReducer(null, {
  [activityActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [activityActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
