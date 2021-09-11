import { createAction, createReducer } from '@reduxjs/toolkit';
import { INFORME_REQUEST, INFORME_SUCCESS, INFORME_FAIL } from './types';

// Actions
export const informeActionRequest = createAction(INFORME_REQUEST);
export const informeActionSuccess = createAction(INFORME_SUCCESS);
export const informeActionFail = createAction(INFORME_FAIL);

export const informeReducer = createReducer(null, {
  [informeActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [informeActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
