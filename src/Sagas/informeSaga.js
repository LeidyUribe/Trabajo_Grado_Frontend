import {
    all, call, takeLatest, put,
  } from 'redux-saga/effects';
  import { INFORME_REQUEST } from '../Store/types';
  import { informeActionFail, informeActionSuccess  } from '../Store/informeSlice';
  
  import api from '../utils/api';

  export function* informeSaga(action) {
    try {
      const response = yield call(api.createInforme, action.payload);
      yield put(informeActionSuccess(response));
    } catch (e) {
      yield put(informeActionFail(e.message));
    }
  }
  
  export default function* Informe() {
    yield all([takeLatest(INFORME_REQUEST, informeSaga)]);
  }
  