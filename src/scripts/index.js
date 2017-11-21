import '../styles/main.sass';

import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';

import App from './app/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './app/store/configureStore';
import styled from 'styled-components';
import thunk from 'redux-thunk';

const store = configureStore();
const ROOT = document.getElementById('google-maps');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	ROOT,
);
