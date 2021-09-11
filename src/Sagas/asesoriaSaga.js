import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { ASESORIA_REQUEST, ASESORIA_UPDATE_REQUEST, GET_ASESORIA } from '../Store/types';
  import { asesoriaActionSuccess, asesoriaActionFail  } from '../Store/asesoriaSlice';
  
  import api from '../utils/api';
  
  export function* getAsesoriasSaga() {
    try {
      const response = yield call(api.asesorias);
      yield put(asesoriaActionSuccess(response));
    } catch (e) {
      yield put(asesoriaActionFail(e.message));
    }
  }

  export function* asesoriaSaga(action) {
    try {
      const response = yield call(api.createAsesoria, action.payload);
      yield put(asesoriaActionSuccess(response));
    } catch (e) {
      yield put(asesoriaActionFail(e.message));
    }
  }

  export function* asesoriaUpdateSaga(action) {
    try {
      const response = yield call(api.updateAsesoria, action.payload);
      yield put(asesoriaActionSuccess(response));
    } catch (e) {
      yield put(asesoriaActionFail(e.message));
    }
  }
  
  export default function* Asesoria() {
    yield all([takeLatest(GET_ASESORIA, getAsesoriasSaga)]);
    yield all([takeLatest(ASESORIA_REQUEST, asesoriaSaga)]);
    yield all([takeLatest(ASESORIA_UPDATE_REQUEST, asesoriaUpdateSaga)]);
  }
  