
export const listChildren = () => {
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