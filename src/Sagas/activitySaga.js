import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { GET_ACTIVITIES, ACTIVITY_REQUEST, ACTIVITY_UPDATE_REQUEST,ACTIVITY_DELETE_REQUEST } from '../Store/types';
  import { activityActionSuccess,activityActionFail  } from '../Store/activitySlice';
  
  import api from '../utils/api';
  
  export function* getActivitiesSaga() {
    try {
      const response = yield call(api.activities);
      yield put(activityActionSuccess(response));
    } catch (e) {
      yield put(activityActionFail(e.message));
    }
  }

  export function* activitySaga(action) {
    try {
      const response = yield call(api.createActivity, action.payload);
      yield put(activityActionSuccess(response));
    } catch (e) {
      yield put(activityActionFail(e.message));
    }
  }

  export function* activityUpdateSaga(action) {
    try {
      const response = yield call(api.updateActivity, action.payload);
      yield put(activityActionSuccess(response));
    } catch (e) {
      yield put(activityActionFail(e.message));
    }
  }

  export function* activityDeleteSaga(action) {
    try {
      const response = yield call(api.deleteActivity, action.payload);
      yield put(activityActionSuccess(response));
    } catch (e) {
      yield put(activityActionFail(e.message));
    }
  }
  
  export default function* Activities() {
    yield all([takeLatest(GET_ACTIVITIES, getActivitiesSaga)]);
    yield all([takeLatest(ACTIVITY_REQUEST, activitySaga)]);
    yield all([takeLatest(ACTIVITY_UPDATE_REQUEST, activityUpdateSaga)]);
    yield all([takeLatest(ACTIVITY_DELETE_REQUEST, activityDeleteSaga)]);
  }
  