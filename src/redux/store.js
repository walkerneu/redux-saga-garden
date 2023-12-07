import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeLatest ('SAGA/GET_PLANTS', getPlants);
}

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload
    default:
      return state;
  }
};
function* getPlants (){
  try {
      const response = yield axios({
          method: 'GET',
          url: '/api/plants'
      })
      yield put({
          type: "ADD_PLANT",
          payload: response.data
      })
  } catch (error) {
      console.log('SAGA getPlants failed', error);
  }
}

const store = createStore(
  combineReducers({ plantList }),
applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

export default store;
