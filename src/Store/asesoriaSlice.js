import { createAction, createReducer } from '@reduxjs/toolkit';
import { ASESORIA_REQUEST, GET_ASESORIA, ASESORIA_UPDATE_REQUEST, ASESORIA_SUCCESS, ASESORIA_FAIL} from './types';

// Actions
export const asesoriaActionRequest = createAction(ASESORIA_REQUEST);
export const asesoriaUpdateRequest = createAction(ASESORIA_UPDATE_REQUEST);
export const asesoriaActionGetAsesoria = createAction(GET_ASESORIA);
export const asesoriaActionSuccess = createAction(ASESORIA_SUCCESS);
export const asesoriaActionFail = createAction(ASESORIA_FAIL);

export const asesoriaReducer = createReducer(null, {
  [asesoriaActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [asesoriaActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
