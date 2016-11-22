import { listChildren } from './communication';

import { put, take } from 'redux-saga/effects';

export function* loadChildren() {
    const children = yield listChildren();
    yield put({type: 'CD_DONE', children});
}

export function* watchForLoadChildren() {
  while(true) {
    yield take('CD');
    yield loadChildren();
  }
}