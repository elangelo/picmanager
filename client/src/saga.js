
const fetchChildren = () => {
    fetch('./api/files?path=')
        .then(function (response) {
            return response.json();
        })
        .then(function (blob) {
            return blob;
        }).catch(function (err) {
            alert(err);
        });
};

import {put} from 'redux-saga/effects';

export function* loadChildren() {
    const children = yield fetchChildren();
    console.log('load some children');
}