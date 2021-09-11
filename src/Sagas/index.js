import { all, fork } from 'redux-saga/effects';
import auth from './authSaga';
import Users from './userSaga';
import Activities from './activitySaga';
import People from './peopleSaga';
import Lines from './linesSaga';
import Import from './importSaga';
import Asesoria from './asesoriaSaga';
import Informe from './informeSaga';


export default function* rootSaga() {
  yield all([fork(auth)]);
  yield all([fork(Users)]);
  yield all([fork(People)]);
  yield all([fork(Activities)]);
  yield all([fork(Lines)]);
  yield all([fork(Import)]);
  yield all([fork(Asesoria)]);
  yield all([fork(Informe)]);
}
