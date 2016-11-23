import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './components/gallery';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import {watchForLoadChildren} from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchForLoadChildren);

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
