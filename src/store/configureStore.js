import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

export default initialState => createStore(rootReducer, initialState, applyMiddleware(...middleware));
