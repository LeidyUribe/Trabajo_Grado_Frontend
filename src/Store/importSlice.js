import { createAction, createReducer } from '@reduxjs/toolkit';
import { GET_CARREES, INSERT_INFO_ESTUDIANTES, INSERT_INFO_DOCENTES, INSERT_INFO_PERSONAL, INSERT_INFO_CARRERAS, INSERT_SUCCESS, INSERT_FAIL} from './types';

// Actions
export const getActionCarrers = createAction(GET_CARREES);
export const imporEstudiantestActionRequest = createAction(INSERT_INFO_ESTUDIANTES);
export const imporDocentestActionRequest = createAction(INSERT_INFO_DOCENTES);
export const imporPersonaltActionRequest = createAction(INSERT_INFO_PERSONAL);
export const imporCarrerastActionRequest = createAction(INSERT_INFO_CARRERAS);
export const importActionSuccess = createAction(INSERT_SUCCESS);
export const importActionFail = createAction(INSERT_FAIL);

export const importReducer = createReducer(null, {
  [importActionSuccess]: (state, action) => ({...state, data: action.payload, error: '' }) ,
  [importActionFail ]: (state, action) => ({...state, data:[] , error: action.payload }) ,
});
