import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { GET_PEOPLE, PEOPLE_REQUEST, PEOPLE_UPDATE_REQUEST } from '../Store/types';
  import { peopleActionSuccess,peopleActionFail  } from '../Store/externalSlice';
  
  import api from '../utils/api';
  
  export function* getPeopleSaga() {
    try {
      const response = yield call(api.peopleEx);
      yield put(peopleActionSuccess(response));
    } catch (e) {
      yield put(peopleActionFail(e.message));
    }
  }

  export function* peopleSaga(action) {
    try {
      const response = yield call(api.createPeople, action.payload);
      yield put(peopleActionSuccess(response));
    } catch (e) {
      yield put(peopleActionFail(e.message));
    }
  }

  export function* peopleUpdateSaga(action) {
    try {
      const response = yield call(api.updatePeople, action.payload);
      yield put(peopleActionSuccess(response));
    } catch (e) {
      yield put(peopleActionFail(e.message));
    }
  }
  
  export default function* People() {
    yield all([takeLatest(GET_PEOPLE, getPeopleSaga)]);
    yield all([takeLatest(PEOPLE_REQUEST, peopleSaga)]);
    yield all([takeLatest(PEOPLE_UPDATE_REQUEST, peopleUpdateSaga)]);
  }
  