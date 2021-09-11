import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { GET_CARREES, INSERT_INFO_ESTUDIANTES, INSERT_INFO_DOCENTES, INSERT_INFO_PERSONAL, INSERT_INFO_CARRERAS } from '../Store/types';
  import { importActionSuccess, importActionFail  } from '../Store/importSlice';
  
  import api from '../utils/api';
  
  export function* getCarreesSaga() {
    try {
      const response = yield call(api.carrers);
      yield put(importActionSuccess(response));
    } catch (e) {
      yield put(importActionFail(e.message));
    }
  }

  export function* estudianteSaga(action) {
    try {
      const response = yield call(api.createEstudent, action.payload);
      yield put(importActionSuccess(response));
    } catch (e) {
      yield put(importActionFail(e.message));
    }
  }

  export function* docenteSaga(action) {
    try {
      const response = yield call(api.createDocente, action.payload);
      yield put(importActionSuccess(response));
    } catch (e) {
      yield put(importActionFail(e.message));
    }
  }

  export function* personalSaga(action) {
    try {
      const response = yield call(api.createPersonal, action.payload);
      yield put(importActionSuccess(response));
    } catch (e) {
      yield put(importActionFail(e.message));
    }
  }

  export function* carreraSaga(action) {
    try {
      const response = yield call(api.createCarrera, action.payload);
      yield put(importActionSuccess(response));
    } catch (e) {
      yield put(importActionFail(e.message));
    }
  }


  
  export default function* Import() {
    yield all([takeLatest(GET_CARREES, getCarreesSaga)]);
    yield all([takeLatest(INSERT_INFO_ESTUDIANTES, estudianteSaga)]);
    yield all([takeLatest(INSERT_INFO_DOCENTES, docenteSaga)]);
    yield all([takeLatest(INSERT_INFO_PERSONAL, personalSaga)]);
    yield all([takeLatest(INSERT_INFO_CARRERAS, carreraSaga)]);
  }
  