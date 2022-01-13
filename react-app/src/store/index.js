import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import session from './session'
import organizations from './organizations'
import orgmainchatReducer from './orgmainchat'
import showFormReducer from './showForm';
import channelReducer from './channels';
import currentChannel from './currentChannel';
import messages from './messages';
const rootReducer = combineReducers({
  session,
  organizations,
  orgmainchatReducer,
  showFormReducer,
  channelReducer,
  currentChannel,
  messages
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
