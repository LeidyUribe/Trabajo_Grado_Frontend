import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../Sagas/index';
import { loginReducer } from './loginSlice';
import { UserReducer } from './userSlice';
import { activityReducer } from './activitySlice';
import { peopleReducer } from './externalSlice';
import { linesReducer } from './linesSlice';
import { importReducer } from './importSlice';
import { asesoriaReducer } from './asesoriaSlice';
import { informeReducer } from './informeSlice';


const reducer = combineReducers({
  loginReducer,
  UserReducer,
  activityReducer,
  peopleReducer,
  linesReducer,
  importReducer,
  asesoriaReducer,
  informeReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
