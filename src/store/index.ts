
import { createStore, applyMiddleware, combineReducers } from 'redux'
import global from './global';
import thunkMiddleware from 'redux-thunk'
const appReducer = {
  global
}
const store = createStore(
  combineReducers(appReducer),
  applyMiddleware(thunkMiddleware)
)
export default  store;
