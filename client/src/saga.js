import { listChildren } from './communication';
import * as GalleryActions from './actions.js';
import { put, take, fork } from 'redux-saga/effects';

export function* loadChildren(newpath = '/') {
  const children = yield listChildren(newpath);
  //console.log('from saga: ' + children);
  yield put({ type: 'CD_DONE', children });
}

export function* watchForLoadChildren() {
  while (true) {
    //console.log('watching for LIST_DIRECTORY action');
    const { directory } = yield take(GalleryActions.LIST_DIRECTORY);
    console.log('got a LIST_DIRECTORY action ' + directory);
    yield fork(loadChildren, directory);
  }
}