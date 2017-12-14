import { applyMiddleware, compose, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import reducer from '../reducers/reducers';
import thunk from 'redux-thunk';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const configureStore = (initialState) => {
	const store = createStoreWithMiddleware(
		reducer,
		initialState,
		composeWithDevTools(
			applyMiddleware(thunk, logger),
		),
	);
	return store;
};

export default configureStore;
