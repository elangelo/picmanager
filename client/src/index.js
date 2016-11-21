
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import {loadChildren} from './saga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(loadChildren);

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
