import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeLatest ('SAGA/GET_PLANTS', getPlants);
  yield takeLatest ('SAGA/POST_PLANT', postPlant);
  yield takeLatest ('SAGA/DELETE_PLANT', deletePlant);
}

const sagaMiddleware = createSagaMiddleware();

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
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
          type: "SET_PLANTS",
          payload: response.data
      })
  } catch (error) {
      console.log('SAGA getPlants failed', error);
  }
}
function* postPlant (action){
  try {
    const response = yield axios({
      method: 'POST',
      url: 'api/plants',
      data: action.payload
    })
    yield put({
      type: "SAGA/GET_PLANTS"
    })
  } catch (error) {
    console.log('Error in SAGA postPlant', error)
  }
}
function* deletePlant (action){
  try {
    const response = yield axios({
      method: 'DELETE',
      url: `api/plants/${action.payload}`
    })
    yield put({
      type: 'SAGA/GET_PLANTS'
    })
  } catch (error) {
    console.log('Error in SAGA deletePlant', error)
  }
}

const store = createStore(
  combineReducers({ plantList }),
applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

export default store;
