import { applyMiddleware, compose, createStore } from 'redux';

import reducer from '../reducers/reducers';
import thunk from 'redux-thunk';

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

const configureStore = (initialState) => {
	return finalCreateStore(reducer, initialState);
};

export default configureStore;
