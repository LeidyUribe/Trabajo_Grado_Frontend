import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { GET_LINES, LINES_REQUEST, LINES_UPDATE_REQUEST,LINES_DELETE_REQUEST } from '../Store/types';
  import { linesActionSuccess,linesActionFail  } from '../Store/linesSlice';
  
  import api from '../utils/api';
  
  export function* getLinesSaga() {
    try {
      const response = yield call(api.lines);
      yield put(linesActionSuccess(response));
    } catch (e) {
      yield put(linesActionFail(e.message));
    }
  }

  export function* lineSaga(action) {
    try {
      const response = yield call(api.createLine, action.payload);
      yield put(linesActionSuccess(response));
    } catch (e) {
      yield put(linesActionFail(e.message));
    }
  }

  export function* lineUpdateSaga(action) {
    try {
      const response = yield call(api.updateLine, action.payload);
      yield put(linesActionSuccess(response));
    } catch (e) {
      yield put(linesActionFail(e.message));
    }
  }

  export function* lineDeleteSaga(action) {
    try {
      const response = yield call(api.deleteLine, action.payload);
      yield put(linesActionSuccess(response));
    } catch (e) {
      yield put(linesActionFail(e.message));
    }
  }
  
  export default function* Lines() {
    yield all([takeLatest(GET_LINES, getLinesSaga)]);
    yield all([takeLatest(LINES_REQUEST, lineSaga)]);
    yield all([takeLatest(LINES_UPDATE_REQUEST, lineUpdateSaga)]);
    yield all([takeLatest(LINES_DELETE_REQUEST, lineDeleteSaga)]);
  }
  