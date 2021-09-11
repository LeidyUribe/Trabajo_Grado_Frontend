import {
  all, call, takeLatest, put,
} from 'redux-saga/effects';
import { AUTH_REQUEST } from '../Store/types';
import { loginActionSuccess, loginActionFail } from '../Store/loginSlice';

import api from '../utils/api';

export function* loginSaga(action) {
  try {
    const response = yield call(api.auth, action.payload);
    yield put(loginActionSuccess(response));
  } catch (e) {
    yield put(loginActionFail(e.message));
  }
}

export default function* auth() {
  yield all([takeLatest(AUTH_REQUEST, loginSaga)]);
}
