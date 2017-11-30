import '../styles/main.sass';

import { applyMiddleware, compose, createStore } from 'redux';

import App from './app/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './app/store/configureStore';

const store = configureStore();
const ROOT = document.getElementById('google-maps');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	ROOT,
);
