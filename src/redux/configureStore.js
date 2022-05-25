import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
// middleware to prevent state matation
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

export default function configureStore(initialState) {
  // add support for Redux devtools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  )
}
