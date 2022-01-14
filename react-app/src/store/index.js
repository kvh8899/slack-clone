import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import session from './session'
import organizations from './organizations'
import orgmainchatReducer from './orgmainchat'
import showFormReducer from './showForm';
import editChannelFormReducer from './showEditChannelForm';
import editOrgFormReducer from './showEditOrg'
import channelReducer from './channels';
import currentChannel from './currentChannel';
import addMemberFormReducer from './showMemberForm'

import messages from './messages';

const rootReducer = combineReducers({
  session,
  organizations,
  orgmainchatReducer,
  showFormReducer,
  editChannelFormReducer,
  editOrgFormReducer,
  channelReducer,
  currentChannel,
  messages,
  addMemberFormReducer,

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
