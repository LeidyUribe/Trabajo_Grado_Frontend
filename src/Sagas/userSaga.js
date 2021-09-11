import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { GET_USERS, USER_REQUEST, USER_UPDATE_REQUEST } from '../Store/types';
  import { userActionSuccess,usernActionFail  } from '../Store/userSlice';
  
  import api from '../utils/api';
  
  export function* getUsersSaga() {
    try {
      const response = yield call(api.users);
      yield put(userActionSuccess(response));
    } catch (e) {
      yield put(usernActionFail(e.message));
    }
  }

  export function* userSaga(action) {
    try {
      const response = yield call(api.createUser, action.payload);
      yield put(userActionSuccess(response));
    } catch (e) {
      yield put(usernActionFail(e.message));
    }
  }

  export function* userUpdateSaga(action) {
    try {
      const response = yield call(api.updateUser, action.payload);
      yield put(userActionSuccess(response));
    } catch (e) {
      yield put(usernActionFail(e.message));
    }
  }
  
  export default function* Users() {
    yield all([takeLatest(GET_USERS, getUsersSaga)]);
    yield all([takeLatest(USER_REQUEST, userSaga)]);
    yield all([takeLatest(USER_UPDATE_REQUEST, userUpdateSaga)]);
  }
  