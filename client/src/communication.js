export const listChildren = (directory = '/') => {
    return fetch('./api/files?path=' + directory)
        .then(function (response) {
            return response.json();
        })
        .then(function (blob) {
            return blob;
        });
};