import React from 'react';
export default function PathToolbar({path, listDirectory}) {
    //split accoring to '/' and get rid of empty items
    var pathparts = path
        .split('/')
        .filter((item) => (item != ''));

    //transform array into an array that has name and fullpath 
    var explodedPath = new Array();
    for (var i = 0; i < pathparts.length; i++) {
        var name = pathparts[i];
        if (i > 0) {
            name = (explodedPath[i - 1]).path + '/' + name;
        }
        explodedPath[i] = { name: pathparts[i], path: name };
    }

    var htmlpath = explodedPath.map(function (item, index) {
        return (
            <div id={index}>
                <div style={{ float: 'left', color: 'rgb(255, 255, 255)', paddingLeft: 10, paddingRight: 10 }}>></div>
                <div onClick={listDirectory.bind(this, item.path)} style={{ float: 'left', color: 'rgb(255, 255, 255)' }}>
                    {item.name}
                </div>
            </div>
        );
    });
    return (
        <div style={{ height: 40, background: 'rgb(10, 10, 10)',  width: '100%', clear: 'both', paddingLeft: 45, position: 'relative'}}>
            <div style={{position: 'absolute', top: '50%', transform: 'translate(0,-50%)', width: '100%'}}>
                <div style={{ float: 'left', color: 'rgb(255, 255, 255)' }} onClick={listDirectory.bind(this, '/')}>root</div>
                {htmlpath}
            </div>
        </div>
    );
}