import { createAction, createReducer } from '@reduxjs/toolkit';
import { PEOPLE_REQUEST, PEOPLE_UPDATE_REQUEST, GET_PEOPLE, PEOPLE_SUCCESS, PEOPLE_FAIL } from './types';

// Actions
export const peopleActionRequest = createAction(PEOPLE_REQUEST);
export const peopleUpdateRequest = createAction(PEOPLE_UPDATE_REQUEST);
export const peopleActionGetPeople = createAction(GET_PEOPLE);
export const peopleActionSuccess = createAction(PEOPLE_SUCCESS);
export const peopleActionFail = createAction(PEOPLE_FAIL);


export const peopleReducer = createReducer(null, {
  [peopleActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [peopleActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
