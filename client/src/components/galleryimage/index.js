import React from 'react';
import Path from 'path';

const maincontainerStyle = {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    boxShadow: '2px 2px 5px rgba(0,0,0,0.25)',
    float: 'left',
    display: 'block',
    width: 200,
    height: 200,
    marginLeft: 1,
    marginRight: 12.5,
    marginTop: 16,
    padding: 5,
    cursor: 'pointer'
};

// const tagcontainerStyle = {
//     backgroundColor: '#C6FCFF',
//     color: 'rgb( 100, 100, 100)',
//     fontSize: 'small',
//     margin:  2,
//     padding: 2,
//     float: 'left'
// };

export default function GalleryImage({name, path, selectImage}) {
    var fulluri = '/api/image?path=' + path + '&size=100';
    return (
        <div style={maincontainerStyle} onClick={selectImage.bind(this, path)}>
            <div style={{ margin: 'auto', width: '80%' }}>
                <img style={{ height: 160, width: 160 }} src={fulluri} />
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', fontWeight: 'normal' }}>
                {name}
            </div>
        </div>
    );
}
