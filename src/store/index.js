import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from '../history';
import * as reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(
  thunk,
  routerMiddleware(history)
)

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

export default createStore(rootReducer, composeEnhancers(middleware));
