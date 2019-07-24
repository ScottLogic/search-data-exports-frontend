import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export default initialState => createStore(rootReducer, initialState);
