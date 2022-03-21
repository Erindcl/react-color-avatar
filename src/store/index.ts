
import { createStore, applyMiddleware, combineReducers } from 'redux'
import global from './global';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const appReducer = {
  global
}
const store = createStore(
  combineReducers(appReducer),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
export default  store;
